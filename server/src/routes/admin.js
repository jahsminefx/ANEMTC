const express = require('express');
const multer = require('multer');
const path = require('path');
const { comparePassword, generateToken, slugify } = require('../utils/security');
const { authenticateAdmin } = require('../middleware/auth');
const { loginRateLimiter } = require('../middleware/rateLimiter');
const { uploadImage } = require('../services/cloudinary');
const store = require('../utils/dbStore');

const router = express.Router();

const upload = multer({
  dest: path.join(__dirname, '../../uploads/temp'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowed.test(ext) && (mime.startsWith('image/') || mime === 'image/svg+xml')) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, WEBP, and SVG image files are allowed.'));
    }
  }
});

/* ==========================================================================
   ADMIN AUTHENTICATION (UNPROTECTED LOGIN)
   ========================================================================== */

router.post('/auth/login', loginRateLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const admin = store.adminUsers.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const isMatch = await comparePassword(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    admin.lastLoginAt = new Date();

    const token = generateToken({ id: admin.id, email: admin.email, role: admin.role });

    store.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      adminId: admin.id,
      action: 'ADMIN_LOGIN',
      targetType: 'AdminUser',
      targetId: admin.id,
      createdAt: new Date()
    });

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/auth/me', authenticateAdmin, async (req, res) => {
  res.json({ success: true, admin: req.admin });
});

router.post('/auth/logout', authenticateAdmin, async (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true, message: 'Logged out successfully.' });
});

/* ==========================================================================
   PROTECTED ADMIN ROUTES
   ========================================================================== */

router.use(authenticateAdmin);

router.get('/stats', async (req, res, next) => {
  try {
    res.json({
      success: true,
      stats: {
        totalProducts: store.products.length,
        featuredProducts: store.products.filter(p => p.isFeatured).length,
        totalPartners: store.partnerCompanies.length,
        publishedArticles: store.blogPosts.filter(p => p.status === 'PUBLISHED').length,
        totalSubscribers: store.newsletterSubscribers.filter(s => s.status === 'ACTIVE').length
      },
      recentActivity: store.auditLogs.slice(0, 10)
    });
  } catch (error) {
    next(error);
  }
});

router.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file uploaded.' });
    }
    const folder = req.body.folder || 'general';
    const uploadResult = await uploadImage(req.file.path, folder);

    res.json({
      success: true,
      url: uploadResult.url,
      publicId: uploadResult.publicId
    });
  } catch (error) {
    next(error);
  }
});

/* Products */
router.get('/products', async (req, res) => {
  res.json({ success: true, data: store.products });
});

router.post('/products', async (req, res) => {
  const { name, shortDescription, description, partnerId, images, externalUrl, isFeatured, isPublished } = req.body;
  const partner = store.partnerCompanies.find(p => p.id === partnerId);
  const newProduct = {
    id: `prod-${Date.now()}`,
    name,
    slug: slugify(name),
    shortDescription,
    description,
    partnerId,
    partner: partner ? { id: partner.id, name: partner.name, slug: partner.slug, logo: partner.logo } : null,
    images: Array.isArray(images) ? images.map((url, idx) => ({ url: typeof url === 'string' ? url : url.url, isPrimary: idx === 0 })) : [],
    externalUrl: externalUrl || null,
    isFeatured: Boolean(isFeatured),
    isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  store.products.unshift(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

router.put('/products/:id', async (req, res) => {
  const prod = store.products.find(p => p.id === req.params.id);
  if (!prod) return res.status(404).json({ success: false, error: 'Product not found.' });

  const { name, shortDescription, description, partnerId, images, externalUrl, isFeatured, isPublished } = req.body;
  if (name) { prod.name = name; prod.slug = slugify(name); }
  if (shortDescription) prod.shortDescription = shortDescription;
  if (description) prod.description = description;
  if (partnerId) {
    prod.partnerId = partnerId;
    const partner = store.partnerCompanies.find(p => p.id === partnerId);
    if (partner) prod.partner = { id: partner.id, name: partner.name, slug: partner.slug, logo: partner.logo };
  }
  if (Array.isArray(images)) {
    prod.images = images.map((url, idx) => ({ url: typeof url === 'string' ? url : url.url, isPrimary: idx === 0 }));
  }
  if (externalUrl !== undefined) prod.externalUrl = externalUrl;
  if (isFeatured !== undefined) prod.isFeatured = Boolean(isFeatured);
  if (isPublished !== undefined) prod.isPublished = Boolean(isPublished);

  res.json({ success: true, data: prod });
});

router.delete('/products/:id', async (req, res) => {
  const idx = store.products.findIndex(p => p.id === req.params.id);
  if (idx !== -1) store.products.splice(idx, 1);
  res.json({ success: true, message: 'Product deleted.' });
});

/* Partners */
router.get('/partners', async (req, res) => {
  res.json({ success: true, data: store.partnerCompanies });
});

router.post('/partners', async (req, res) => {
  const { name, logo, description, websiteUrl, registrationUrl, productUrl, isFeatured, isPublished } = req.body;
  const newPartner = {
    id: `partner-${Date.now()}`,
    name,
    slug: slugify(name),
    logo: logo || null,
    description,
    websiteUrl,
    registrationUrl: registrationUrl || null,
    productUrl: productUrl || null,
    isFeatured: Boolean(isFeatured),
    isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  store.partnerCompanies.unshift(newPartner);
  res.status(201).json({ success: true, data: newPartner });
});

router.put('/partners/:id', async (req, res) => {
  const partner = store.partnerCompanies.find(p => p.id === req.params.id);
  if (!partner) return res.status(404).json({ success: false, error: 'Partner not found.' });

  const { name, logo, description, websiteUrl, isFeatured, isPublished } = req.body;
  if (name) { partner.name = name; partner.slug = slugify(name); }
  if (logo !== undefined) partner.logo = logo;
  if (description !== undefined) partner.description = description;
  if (websiteUrl !== undefined) partner.websiteUrl = websiteUrl;
  if (isFeatured !== undefined) partner.isFeatured = Boolean(isFeatured);
  if (isPublished !== undefined) partner.isPublished = Boolean(isPublished);

  res.json({ success: true, data: partner });
});

router.delete('/partners/:id', async (req, res) => {
  const idx = store.partnerCompanies.findIndex(p => p.id === req.params.id);
  if (idx !== -1) store.partnerCompanies.splice(idx, 1);
  res.json({ success: true, message: 'Partner deleted.' });
});

/* Services */
router.get('/services', async (req, res) => {
  res.json({ success: true, data: store.services });
});

router.post('/services', async (req, res) => {
  const { name, shortDescription, description, image, isPublished } = req.body;
  const newService = {
    id: `serv-${Date.now()}`,
    name,
    slug: slugify(name),
    shortDescription,
    description,
    image: image || null,
    isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    sortOrder: store.services.length + 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  store.services.push(newService);
  res.status(201).json({ success: true, data: newService });
});

router.put('/services/:id', async (req, res) => {
  const serv = store.services.find(s => s.id === req.params.id);
  if (!serv) return res.status(404).json({ success: false, error: 'Service not found.' });

  const { name, shortDescription, description, image, isPublished } = req.body;
  if (name) { serv.name = name; serv.slug = slugify(name); }
  if (shortDescription) serv.shortDescription = shortDescription;
  if (description) serv.description = description;
  if (image !== undefined) serv.image = image;
  if (isPublished !== undefined) serv.isPublished = Boolean(isPublished);

  res.json({ success: true, data: serv });
});

router.delete('/services/:id', async (req, res) => {
  const idx = store.services.findIndex(s => s.id === req.params.id);
  if (idx !== -1) store.services.splice(idx, 1);
  res.json({ success: true, message: 'Service deleted.' });
});

/* Categories */
router.get('/categories', async (req, res) => {
  res.json({ success: true, data: store.wellnessCategories });
});

router.post('/categories', async (req, res) => {
  const { name, description, image } = req.body;
  const newCat = {
    id: `cat-${Date.now()}`,
    name,
    slug: slugify(name),
    description: description || null,
    image: image || null
  };
  store.wellnessCategories.push(newCat);
  res.status(201).json({ success: true, data: newCat });
});

router.put('/categories/:id', async (req, res) => {
  const cat = store.wellnessCategories.find(c => c.id === req.params.id);
  if (!cat) return res.status(404).json({ success: false, error: 'Category not found.' });

  const { name, description, image } = req.body;
  if (name) { cat.name = name; cat.slug = slugify(name); }
  if (description !== undefined) cat.description = description;
  if (image !== undefined) cat.image = image;

  res.json({ success: true, data: cat });
});

router.delete('/categories/:id', async (req, res) => {
  const idx = store.wellnessCategories.findIndex(c => c.id === req.params.id);
  if (idx !== -1) store.wellnessCategories.splice(idx, 1);
  res.json({ success: true, message: 'Category deleted.' });
});

/* Blog */
router.get('/blog', async (req, res) => {
  res.json({ success: true, data: store.blogPosts });
});

router.post('/blog', async (req, res) => {
  const { title, excerpt, content, featuredImage, author, status } = req.body;
  const newPost = {
    id: `post-${Date.now()}`,
    title,
    slug: slugify(title),
    excerpt,
    content,
    featuredImage: featuredImage || null,
    author: author || 'Aninta Wellness Team',
    status: status || 'DRAFT',
    publishedAt: status === 'PUBLISHED' ? new Date() : null,
    createdAt: new Date()
  };
  store.blogPosts.unshift(newPost);
  res.status(201).json({ success: true, data: newPost });
});

router.put('/blog/:id', async (req, res) => {
  const post = store.blogPosts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ success: false, error: 'Article not found.' });

  const { title, excerpt, content, featuredImage, author, status } = req.body;
  if (title) { post.title = title; post.slug = slugify(title); }
  if (excerpt !== undefined) post.excerpt = excerpt;
  if (content !== undefined) post.content = content;
  if (featuredImage !== undefined) post.featuredImage = featuredImage;
  if (author !== undefined) post.author = author;
  if (status !== undefined) {
    post.status = status;
    if (status === 'PUBLISHED' && !post.publishedAt) post.publishedAt = new Date();
  }

  res.json({ success: true, data: post });
});

router.delete('/blog/:id', async (req, res) => {
  const idx = store.blogPosts.findIndex(p => p.id === req.params.id);
  if (idx !== -1) store.blogPosts.splice(idx, 1);
  res.json({ success: true, message: 'Article deleted.' });
});

/* Subscribers */
router.get('/subscribers', async (req, res) => {
  res.json({ success: true, data: store.newsletterSubscribers });
});

router.get('/subscribers/export', async (req, res) => {
  let csv = 'Email,First Name,Status,Brevo Synced,Subscribed Date\n';
  store.newsletterSubscribers.forEach(sub => {
    const email = `"${sub.email.replace(/"/g, '""')}"`;
    const name = `"${(sub.firstName || '').replace(/"/g, '""')}"`;
    csv += `${email},${name},${sub.status},${sub.brevoSynced ? 'Yes' : 'No'},${sub.createdAt}\n`;
  });
  res.header('Content-Type', 'text/csv');
  res.attachment('aninta_newsletter_subscribers.csv');
  res.send(csv);
});

/* Settings */
router.get('/settings', async (req, res) => {
  res.json({ success: true, data: store.siteSettings });
});

router.put('/settings', async (req, res) => {
  const { settings } = req.body;
  if (settings && typeof settings === 'object') {
    Object.entries(settings).forEach(([key, value]) => {
      const idx = store.siteSettings.findIndex(s => s.key === key);
      if (idx !== -1) {
        store.siteSettings[idx].value = String(value);
      } else {
        store.siteSettings.push({ key, value: String(value) });
      }
    });
  }
  res.json({ success: true, data: store.siteSettings });
});

module.exports = router;
