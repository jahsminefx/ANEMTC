const express = require('express');
const { z } = require('zod');
const { newsletterRateLimiter } = require('../middleware/rateLimiter');
const { syncContactToBrevo } = require('../services/brevo');
const store = require('../utils/dbStore');

const router = express.Router();

// Validation schema for newsletter subscription
const subscriptionSchema = z.object({
  firstName: z.string().min(1, 'First name is required.').max(100),
  email: z.string().email('Please provide a valid email address.').max(255),
  honeypot: z.string().optional() // Anti-spam field
});

/**
 * GET /api/services
 */
router.get('/services', async (req, res, next) => {
  try {
    const services = store.services.filter(s => s.isPublished).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/services/:slug
 */
router.get('/services/:slug', async (req, res, next) => {
  try {
    const service = store.services.find(s => s.slug === req.params.slug && s.isPublished);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found.' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products
 */
router.get('/products', async (req, res, next) => {
  try {
    const { search, partner, category, featured, limit = 20, page = 1 } = req.query;

    let filtered = store.products.filter(p => p.isPublished);

    if (featured === 'true') {
      filtered = filtered.filter(p => p.isFeatured);
    }

    if (partner) {
      filtered = filtered.filter(p => p.partner?.slug === String(partner));
    }

    if (category) {
      filtered = filtered.filter(p => p.categorySlugs && p.categorySlugs.includes(String(category)));
    }

    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    const take = parseInt(limit, 10);
    const total = filtered.length;
    const paginated = filtered.slice((parseInt(page, 10) - 1) * take, parseInt(page, 10) * take);

    res.json({
      success: true,
      data: paginated,
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: take,
        pages: Math.ceil(total / take)
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products/:slug
 */
router.get('/products/:slug', async (req, res, next) => {
  try {
    const product = store.products.find(p => p.slug === req.params.slug && p.isPublished);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }

    const related = store.products
      .filter(p => p.isPublished && p.id !== product.id && p.partnerId === product.partnerId)
      .slice(0, 3);

    res.json({
      success: true,
      data: product,
      related
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/categories
 */
router.get('/categories', async (req, res, next) => {
  try {
    const categories = store.wellnessCategories;
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/categories/:slug
 */
router.get('/categories/:slug', async (req, res, next) => {
  try {
    const category = store.wellnessCategories.find(c => c.slug === req.params.slug);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found.' });
    }

    const products = store.products.filter(p => p.isPublished && p.categorySlugs?.includes(category.slug));

    res.json({
      success: true,
      data: {
        category,
        products
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/partners
 */
router.get('/partners', async (req, res, next) => {
  try {
    const partners = store.partnerCompanies.filter(p => p.isPublished).map(p => ({
      ...p,
      _count: { products: store.products.filter(prod => prod.partnerId === p.id).length }
    }));
    res.json({ success: true, data: partners });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/partners/:slug
 */
router.get('/partners/:slug', async (req, res, next) => {
  try {
    const partner = store.partnerCompanies.find(p => p.slug === req.params.slug && p.isPublished);
    if (!partner) {
      return res.status(404).json({ success: false, error: 'Partner company not found.' });
    }

    const products = store.products.filter(p => p.partnerId === partner.id && p.isPublished);

    res.json({
      success: true,
      data: {
        partner,
        products
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/blog
 */
router.get('/blog', async (req, res, next) => {
  try {
    const { category, search, limit = 10, page = 1 } = req.query;

    let posts = store.blogPosts.filter(p => p.status === 'PUBLISHED');

    if (category) {
      posts = posts.filter(p => p.category?.slug === String(category));
    }

    if (search) {
      const q = String(search).toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
      );
    }

    const take = parseInt(limit, 10);
    const total = posts.length;
    const paginated = posts.slice((parseInt(page, 10) - 1) * take, parseInt(page, 10) * take);

    res.json({
      success: true,
      data: paginated,
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: take,
        pages: Math.ceil(total / take)
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/blog/:slug
 */
router.get('/blog/:slug', async (req, res, next) => {
  try {
    const post = store.blogPosts.find(p => p.slug === req.params.slug && p.status === 'PUBLISHED');
    if (!post) {
      return res.status(404).json({ success: false, error: 'Article not found.' });
    }

    const related = store.blogPosts
      .filter(p => p.status === 'PUBLISHED' && p.id !== post.id)
      .slice(0, 3);

    res.json({
      success: true,
      data: post,
      related
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/settings
 */
router.get('/settings', async (req, res, next) => {
  try {
    const map = {};
    store.siteSettings.forEach(s => {
      map[s.key] = s.value;
    });
    res.json({ success: true, data: map });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/newsletter/subscribe
 */
router.post('/newsletter/subscribe', newsletterRateLimiter, async (req, res, next) => {
  try {
    const parsed = subscriptionSchema.safeParse(req.body);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || 'Invalid form data.';
      return res.status(400).json({ success: false, error: errorMsg });
    }

    const { firstName, email, honeypot } = parsed.data;

    if (honeypot && honeypot.trim() !== '') {
      return res.json({ success: true, message: 'Thank you for subscribing to our newsletter!' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = store.newsletterSubscribers.find(s => s.email === normalizedEmail);

    if (existing) {
      if (existing.status === 'UNSUBSCRIBED') {
        existing.status = 'ACTIVE';
        existing.firstName = firstName;
        return res.json({ success: true, message: 'Welcome back! Your subscription has been reactivated.' });
      }
      return res.status(409).json({ success: false, error: 'This email address is already subscribed to our newsletter.' });
    }

    const newSubscriber = {
      id: `sub-${Date.now()}`,
      email: normalizedEmail,
      firstName,
      status: 'ACTIVE',
      brevoSynced: false,
      createdAt: new Date()
    };

    store.newsletterSubscribers.unshift(newSubscriber);

    syncContactToBrevo({ email: normalizedEmail, firstName }).then(r => {
      if (r.success) newSubscriber.brevoSynced = true;
    });

    res.json({
      success: true,
      message: 'Thank you for subscribing to Aninta Wellness tips & news!'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/sitemap.xml
 */
router.get('/sitemap.xml', (req, res) => {
  const baseUrl = process.env.CLIENT_URL || 'https://anintawellness.com';
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const staticPages = ['', '/about', '/services', '/products', '/partners', '/blog', '/contact', '/privacy', '/disclaimer', '/terms'];
  staticPages.forEach(p => {
    xml += `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  store.services.filter(s => s.isPublished).forEach(s => {
    xml += `  <url>\n    <loc>${baseUrl}/services/${s.slug}</loc>\n  </url>\n`;
  });

  store.products.filter(p => p.isPublished).forEach(p => {
    xml += `  <url>\n    <loc>${baseUrl}/products/${p.slug}</loc>\n  </url>\n`;
  });

  xml += `</urlset>`;
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

/**
 * GET /api/robots.txt
 */
router.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.CLIENT_URL || 'https://anintawellness.com';
  const text = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/admin/\n\nSitemap: ${baseUrl}/api/sitemap.xml\n`;
  res.header('Content-Type', 'text/plain');
  res.send(text);
});

module.exports = router;
