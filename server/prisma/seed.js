const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Aninta Therapy Center database seed...');

  // 1. Clean existing records (optional safety for seeding)
  await prisma.auditLog.deleteMany({});
  await prisma.productCategory.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.partnerCompany.deleteMany({});
  await prisma.wellnessCategory.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.blogPostTag.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.blogCategory.deleteMany({});
  await prisma.blogTag.deleteMany({});
  await prisma.newsletterSubscriber.deleteMany({});
  await prisma.siteSettings.deleteMany({});
  await prisma.adminUser.deleteMany({});

  // 2. Create Superadmin User
  const passwordHash = await bcrypt.hash('AnintaAdmin2026!', 10);
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@aninta.com',
      passwordHash,
      name: 'Aninta Executive Admin',
      role: 'SUPERADMIN'
    }
  });
  console.log(`✅ Admin created: ${admin.email} (Password: AnintaAdmin2026!)`);

  // 3. Create Site Settings
  const defaultSettings = [
    { key: 'site_name', value: 'Aninta Natural & Energy Medicine Therapy Center', description: 'Public site name' },
    { key: 'tagline', value: 'Natural Wellness. Energy Therapy. Better Living.', description: 'Hero tagline' },
    { key: 'phone', value: '+1 (800) 555-2646', description: 'Primary contact phone number' },
    { key: 'whatsapp_number', value: '15552646000', description: 'WhatsApp international contact number' },
    { key: 'whatsapp_default_message', value: 'Hello Aninta Therapy Center. I would like to make an enquiry about your energy therapy services and products.', description: 'Default prefilled WhatsApp message' },
    { key: 'email', value: 'contact@anintawellness.com', description: 'Primary contact email' },
    { key: 'address', value: '100 Serenity Boulevard, Suite 400, San Francisco, CA 94107', description: 'Physical address' },
    { key: 'opening_hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 3:00 PM | Sun: Closed', description: 'Center business hours' },
    { key: 'facebook_url', value: 'https://facebook.com/anintawellness', description: 'Facebook URL' },
    { key: 'instagram_url', value: 'https://instagram.com/anintawellness', description: 'Instagram URL' },
    { key: 'tiktok_url', value: 'https://tiktok.com/@anintawellness', description: 'TikTok URL' },
    { key: 'default_seo_title', value: 'Aninta Natural & Energy Medicine Therapy Center | Holistic Wellness', description: 'Default SEO Title' },
    { key: 'default_seo_description', value: 'Discover energy therapies, holistic wellness consultations, and premium partner products at Aninta Therapy Center.', description: 'Default SEO Description' },
    { key: 'global_disclaimer', value: 'Information provided on this platform is for general educational purposes and is not a substitute for professional medical diagnosis, advice, or treatment. Always consult your physician before starting any wellness program.', description: 'Global health disclaimer' }
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSettings.create({ data: setting });
  }
  console.log('✅ Default Site Settings seeded');

  // 4. Create Services
  const services = [
    {
      name: 'Bio-Energy Assessment & Frequency Therapy',
      slug: 'bio-energy-assessment-frequency-therapy',
      shortDescription: 'Comprehensive energetic mapping to identify frequency imbalances and restore natural vitality.',
      description: 'Our Bio-Energy Assessment measures subtle electromagnetic patterns within the body using non-invasive energy scanning technology. This consultation helps identify areas of physical and emotional fatigue, giving you clear insights into your cellular resonance and energy flow.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
      isPublished: true,
      sortOrder: 1
    },
    {
      name: 'Holistic Energy Balancing Consultation',
      slug: 'holistic-energy-balancing-consultation',
      shortDescription: 'Personalized 1-on-1 guidance integrating energy medicine principles with daily lifestyle optimization.',
      description: 'Work directly with certified Aninta practitioners to create a tailored energy wellness plan. We evaluate sleep patterns, stress stressors, micro-nutrient intake, and environmental factors to help bring your mind, body, and spirit back into equilibrium.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
      isPublished: true,
      sortOrder: 2
    },
    {
      name: 'Cellular Vitality & Micro-Nutrient Guidance',
      slug: 'cellular-vitality-micro-nutrient-guidance',
      shortDescription: 'Educational consultation focusing on plant-derived micro-nutrients and cellular hydration.',
      description: 'Understand how targeted natural compounds and bio-available minerals support mitochondrial energy production and cellular longevity. Learn how to combine trusted partner supplements with nutrient-dense living for optimal everyday wellness.',
      image: 'https://images.unsplash.com/photo-1512290900676-26c2a48f4134?auto=format&fit=crop&w=1000&q=80',
      isPublished: true,
      sortOrder: 3
    },
    {
      name: 'Stress Reduction & Mind-Body Alignment',
      slug: 'stress-reduction-mind-body-alignment',
      shortDescription: 'Guided relaxation, breathwork techniques, and biofield resonance therapies for deep restorative calm.',
      description: 'Experience deep nervous system reset through our specialized stress modulation sessions. Combining therapeutic resonance, restorative breathing, and natural energy alignment, this service helps calm an overactive nervous system and improve mental clarity.',
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80',
      isPublished: true,
      sortOrder: 4
    }
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log('✅ Services seeded');

  // 5. Create Wellness Categories
  const categoriesData = [
    { name: 'General Wellness', slug: 'general-wellness', description: 'Foundational support for everyday vitality and overall wellbeing.', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80' },
    { name: 'Energy & Vitality', slug: 'energy-vitality', description: 'Formulations and tools engineered to support stamina and metabolic energy.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80' },
    { name: 'Digestive Wellness', slug: 'digestive-wellness', description: 'Natural enzyme and gut microbiome support for comfortable digestion.', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bone & Joint Wellness', slug: 'bone-joint-wellness', description: 'Bio-available minerals and botanical extracts for flexible joint function.', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    { name: 'Rest & Relaxation', slug: 'rest-relaxation', description: 'Calming botanical blends for soothing restorative sleep and relaxation.', image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80' },
    { name: 'Healthy Lifestyle', slug: 'healthy-lifestyle', description: 'Clean living essentials to complement an active, balanced daily routine.', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80' },
    { name: 'Immune Wellness', slug: 'immune-wellness', description: 'Antioxidant-rich supplements helping reinforce natural seasonal defenses.', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' }
  ];

  const createdCategories = {};
  for (const cat of categoriesData) {
    const c = await prisma.wellnessCategory.create({ data: cat });
    createdCategories[c.slug] = c;
  }
  console.log('✅ Wellness Categories seeded');

  // 6. Create Partner Companies
  const partnersData = [
    {
      name: 'DLT Natural Wellness',
      slug: 'dlt-natural-wellness',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'Pioneers in standardized herbal extracts and natural bio-active nutrition since 2012.',
      websiteUrl: 'https://dltwellness.example.com',
      registrationUrl: 'https://dltwellness.example.com/register',
      productUrl: 'https://dltwellness.example.com/catalog',
      isFeatured: true,
      isPublished: true,
      sortOrder: 1
    },
    {
      name: 'Newcam Therapy Systems',
      slug: 'newcam-therapy-systems',
      logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80',
      description: 'Leading developer of home frequency therapy equipment and biofield wellness devices.',
      websiteUrl: 'https://newcamhealth.example.com',
      registrationUrl: 'https://newcamhealth.example.com/partner',
      productUrl: 'https://newcamhealth.example.com/products',
      isFeatured: true,
      isPublished: true,
      sortOrder: 2
    },
    {
      name: 'BioThera Cellular Labs',
      slug: 'biothera-cellular-labs',
      logo: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=300&q=80',
      description: 'Advanced cellular nutrition supplements focused on mitochondrial energy balance.',
      websiteUrl: 'https://biotheralabs.example.com',
      registrationUrl: null,
      productUrl: 'https://biotheralabs.example.com/shop',
      isFeatured: true,
      isPublished: true,
      sortOrder: 3
    }
  ];

  const createdPartners = {};
  for (const p of partnersData) {
    const partner = await prisma.partnerCompany.create({ data: p });
    createdPartners[partner.slug] = partner;
  }
  console.log('✅ Partner Companies seeded');

  // 7. Create Products & Product Images
  const productsData = [
    {
      name: 'DLT Vitality Essence Multi-Nutrient Elixir',
      slug: 'dlt-vitality-essence-multi-nutrient-elixir',
      shortDescription: 'Cold-extracted liquid botanical complex supporting daily energy and cellular nutrition.',
      description: 'DLT Vitality Essence is crafted from cold-pressed elderberry, organic turmeric, and bio-available trace minerals. Formulated to support natural energy production without synthetic stimulants or artificial preservatives.',
      partnerSlug: 'dlt-natural-wellness',
      categorySlugs: ['energy-vitality', 'general-wellness'],
      externalUrl: 'https://dltwellness.example.com/products/vitality-essence',
      isFeatured: true,
      isPublished: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80', altText: 'DLT Vitality Essence Bottle', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', altText: 'Natural ingredients showcase', isPrimary: false }
      ]
    },
    {
      name: 'Newcam Personal Biofield Frequency Device',
      slug: 'newcam-personal-biofield-frequency-device',
      shortDescription: 'Portable micro-current and acoustic frequency resonator for localized relaxation.',
      description: 'The Newcam Biofield Frequency Device utilizes harmonic sound waves and soft electromagnetic frequencies to help soothe physical fatigue and support localized tension release.',
      partnerSlug: 'newcam-therapy-systems',
      categorySlugs: ['rest-relaxation', 'energy-vitality'],
      externalUrl: 'https://newcamhealth.example.com/products/biofield-device',
      isFeatured: true,
      isPublished: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', altText: 'Newcam Biofield Frequency Device', isPrimary: true }
      ]
    },
    {
      name: 'BioThera Mitochondrial CoQ10 & PQQ Complex',
      slug: 'biothera-mitochondrial-coq10-pqq-complex',
      shortDescription: 'Synergistic cellular antioxidant formula for cellular stamina and mental focus.',
      description: 'BioThera Mitochondrial Complex pairs high-potency Ubiquinol CoQ10 with Pyrroloquinoline Quinone (PQQ) to encourage natural mitochondrial biogenesis and cellular defense against oxidative stress.',
      partnerSlug: 'biothera-cellular-labs',
      categorySlugs: ['energy-vitality', 'immune-wellness'],
      externalUrl: 'https://biotheralabs.example.com/products/mitochondrial-complex',
      isFeatured: true,
      isPublished: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', altText: 'BioThera Mitochondrial Complex', isPrimary: true }
      ]
    },
    {
      name: 'DLT Herbal Digestive Balance Elixir',
      slug: 'dlt-herbal-digestive-balance-elixir',
      shortDescription: 'Gentle plant bitters and peppermint infusion promoting optimal gut harmony.',
      description: 'A traditional formula combining gentian root, ginger, fennel seed, and peppermint oil to encourage natural digestive enzyme secretion and post-meal comfort.',
      partnerSlug: 'dlt-natural-wellness',
      categorySlugs: ['digestive-wellness', 'general-wellness'],
      externalUrl: 'https://dltwellness.example.com/products/digestive-balance',
      isFeatured: true,
      isPublished: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1512290900676-26c2a48f4134?auto=format&fit=crop&w=800&q=80', altText: 'DLT Digestive Elixir', isPrimary: true }
      ]
    },
    {
      name: 'BioThera Active Plant-Based Collagen Booster',
      slug: 'biothera-active-plant-based-collagen-booster',
      shortDescription: 'Botanical silica, Vitamin C, and amino acids supporting connective tissue and joint flexibility.',
      description: 'A 100% vegan formula containing bamboo extract, amla berry, hyaluronic acid, and glycine to support your body’s natural collagen synthesis and joint comfort.',
      partnerSlug: 'biothera-cellular-labs',
      categorySlugs: ['bone-joint-wellness', 'healthy-lifestyle'],
      externalUrl: 'https://biotheralabs.example.com/products/collagen-booster',
      isFeatured: true,
      isPublished: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1550572017-edd951baa74c?auto=format&fit=crop&w=800&q=80', altText: 'BioThera Collagen Booster', isPrimary: true }
      ]
    },
    {
      name: 'Newcam Restorative Sleep Wave Diffuser',
      slug: 'newcam-restorative-sleep-wave-diffuser',
      shortDescription: 'Acoustic soundscape generator paired with ultrasonic essential oil diffusion.',
      description: 'Designed to promote deep restorative sleep through pink-noise sound frequencies and calming lavender micro-mist diffusion for a peaceful bedroom sanctuary.',
      partnerSlug: 'newcam-therapy-systems',
      categorySlugs: ['rest-relaxation', 'healthy-lifestyle'],
      externalUrl: 'https://newcamhealth.example.com/products/sleep-diffuser',
      isFeatured: true,
      isPublished: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80', altText: 'Newcam Sleep Diffuser', isPrimary: true }
      ]
    }
  ];

  for (const prod of productsData) {
    const partner = createdPartners[prod.partnerSlug];
    const createdProduct = await prisma.product.create({
      data: {
        name: prod.name,
        slug: prod.slug,
        shortDescription: prod.shortDescription,
        description: prod.description,
        partnerId: partner.id,
        externalUrl: prod.externalUrl,
        isFeatured: prod.isFeatured,
        isPublished: prod.isPublished,
        images: {
          create: prod.images
        }
      }
    });

    for (const catSlug of prod.categorySlugs) {
      const cat = createdCategories[catSlug];
      if (cat) {
        await prisma.productCategory.create({
          data: {
            productId: createdProduct.id,
            categoryId: cat.id
          }
        });
      }
    }
  }
  console.log('✅ Products & Product Images seeded');

  // 8. Create Blog Categories, Tags, and Posts
  const blogCat1 = await prisma.blogCategory.create({
    data: { name: 'Energy Medicine & Wellness', slug: 'energy-medicine-wellness', description: 'Articles exploring energetic resonance and holistic vitality.' }
  });
  const blogCat2 = await prisma.blogCategory.create({
    data: { name: 'Nutrition & Lifestyle', slug: 'nutrition-lifestyle', description: 'Tips and recipes for balanced everyday living.' }
  });

  const tag1 = await prisma.blogTag.create({ data: { name: 'Biofield', slug: 'biofield' } });
  const tag2 = await prisma.blogTag.create({ data: { name: 'Hydration', slug: 'hydration' } });
  const tag3 = await prisma.blogTag.create({ data: { name: 'Stress Reduction', slug: 'stress-reduction' } });

  const blogPostsData = [
    {
      title: '5 Simple Habits for Better Daily Wellness & Energy',
      slug: '5-simple-habits-for-better-daily-wellness',
      excerpt: 'Discover practical, non-invasive daily habits that bring balance, improve hydration, and harmonize your bio-energy fields.',
      content: `
### Understanding Everyday Vitality

Wellness isn't built overnight—it is sustained through small, intentional daily habits. When we align our daily routines with natural bio-rhythms, our bodies naturally thrive.

#### 1. Prioritize Morning Hydration with Mineral Electrolytes
Before reaching for caffeine in the morning, drink 16 ounces of warm filtered water infused with a pinch of unrefined sea salt or lemon. This rehydrates cellular membranes after sleep and supports smooth lymphatic drainage.

#### 2. Get 10 Minutes of Morning Sun Exposure
Natural sunlight hitting your eyes early in the day signals your circadian clock, regulating melatonin production for restorative sleep later that night.

#### 3. Practice Grounding (Earthing)
Walking barefoot on natural grass or soil for 10-15 minutes allows your body to absorb free electrons from the Earth, reducing static energetic tension.

#### 4. Mindful Micro-Pauses for Breath
Three times a day, step away from screens and take five slow, deep diaphragmatic breaths (inhale for 4 seconds, hold for 4, exhale for 6).

#### 5. Choose Whole, Unprocessed Foods
Fuel your body with nutrient-rich plant foods, healthy fats, and high-quality supplements recommended by trusted wellness guides.
      `,
      featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
      author: 'Dr. Elena Vance, ND',
      categoryId: blogCat1.id,
      seoTitle: '5 Simple Habits for Better Daily Wellness & Energy | Aninta Wellness',
      seoDescription: 'Learn 5 practical daily habits to improve your energetic vitality and daily wellbeing naturally.',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-08-15T10:00:00Z')
    },
    {
      title: 'Understanding the Importance of Cellular Hydration',
      slug: 'understanding-the-importance-of-cellular-hydration',
      excerpt: 'Why drinking water isn\'t always enough—learn how trace minerals and structured water support true cellular nourishment.',
      content: `
### Beyond Just Drinking Water

Many people drink 8 glasses of water a day yet still feel fatigued, foggy, or sluggish. True hydration occurs at the cellular level, requiring trace electrolytes and healthy cell membrane fluid dynamics.

#### What is Cellular Hydration?
Cellular hydration refers to how effectively water enters the intracellular fluid compartments. Without sufficient magnesium, potassium, and sodium ions, water passes through the digestive tract without fully hydrating tissue matrixes.

#### Tips to Enhance Hydration Efficiency
- **Add Mineral Drops:** Enhance drinking water with ionic trace mineral drops.
- **Eat Water-Rich Fruits:** Cucumbers, watermelon, and celery contain structured biological water easily absorbed by cells.
- **Reduce Trans-Fats:** Healthy cell membranes require omega-3 fatty acids to maintain permeable ion channels.
      `,
      featuredImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1000&q=80',
      author: 'Aninta Wellness Team',
      categoryId: blogCat2.id,
      seoTitle: 'Understanding Cellular Hydration | Aninta Wellness Blog',
      seoDescription: 'Explore the science of cellular hydration, trace minerals, and bio-available hydration strategies.',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-08-20T14:30:00Z')
    },
    {
      title: 'Simple Ways to Support Healthy Digestion Naturally',
      slug: 'simple-ways-to-support-healthy-digestion-naturally',
      excerpt: 'Explore how botanical bitters, mindful chewing, and gut microbiome balance can enhance your digestive comfort.',
      content: `
### Harmony in the Gut

Digestion is the cornerstone of overall vitality. When digestive processes function smoothly, your body efficiently extracts micro-nutrients needed for repair and cellular energy.

#### The Power of Botanical Bitters
Herbal bitters such as gentian, dandelion, and chamomile stimulate vagal nerve pathways, signaling digestive organs to release natural enzymes before meals.

#### Simple Digestive Practices:
1. **Chew Thoroughly:** Aim for 20-30 chews per bite to mix food with salivary amylase.
2. **Avoid Large Liquids During Meals:** Excess water during meals dilutes stomach acid concentrations.
3. **Incorporate Fermented Foods:** Small portions of sauerkraut or kefir nourish beneficial gut microflora.
      `,
      featuredImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
      author: 'Marcus Vance, Holistic Nutritionist',
      categoryId: blogCat2.id,
      seoTitle: 'Simple Ways to Support Healthy Digestion | Aninta Wellness',
      seoDescription: 'Discover natural herbs, mindful eating habits, and microbiome support for comfortable digestion.',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-08-28T09:15:00Z')
    }
  ];

  for (const postData of blogPostsData) {
    const post = await prisma.blogPost.create({ data: postData });
    await prisma.blogPostTag.create({ data: { postId: post.id, tagId: tag1.id } });
    await prisma.blogPostTag.create({ data: { postId: post.id, tagId: tag2.id } });
  }
  console.log('✅ Blog Categories, Tags, and Posts seeded');

  // 9. Create Newsletter Subscribers
  await prisma.newsletterSubscriber.create({
    data: {
      email: 'sample.subscriber@example.com',
      firstName: 'Sarah',
      status: 'ACTIVE',
      brevoSynced: true
    }
  });
  console.log('✅ Newsletter Subscribers seeded');

  console.log('🎉 Aninta Therapy Center Database Seeding Complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
