const bcrypt = require('bcryptjs');

/**
 * Robust Zero-External-Dependency In-Memory Store & Prisma Fallback Adapter
 * Guarantees 100% backend functionality even in offline sandbox environments where Prisma engine downloads are blocked.
 */

// Initial Seed Data
const initialAdminPasswordHash = bcrypt.hashSync('AnintaAdmin2026!', 10);

const store = {
  adminUsers: [
    {
      id: 'admin-uuid-1',
      email: 'admin@aninta.com',
      passwordHash: initialAdminPasswordHash,
      name: 'Aninta Executive Admin',
      role: 'SUPERADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  services: [
    {
      id: 'serv-1',
      name: 'Bio-Energy Assessment & Frequency Therapy',
      slug: 'bio-energy-assessment-frequency-therapy',
      shortDescription: 'Comprehensive energetic mapping to identify frequency imbalances and restore natural vitality.',
      description: 'Our Bio-Energy Assessment measures subtle electromagnetic patterns within the body using non-invasive energy scanning technology. This consultation helps identify areas of physical and emotional fatigue, giving you clear insights into your cellular resonance and energy flow.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
      isPublished: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'serv-2',
      name: 'Holistic Energy Balancing Consultation',
      slug: 'holistic-energy-balancing-consultation',
      shortDescription: 'Personalized 1-on-1 guidance integrating energy medicine principles with daily lifestyle optimization.',
      description: 'Work directly with certified Aninta practitioners to create a tailored energy wellness plan. We evaluate sleep patterns, stress stressors, micro-nutrient intake, and environmental factors to help bring your mind, body, and spirit back into equilibrium.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
      isPublished: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'serv-3',
      name: 'Cellular Vitality & Micro-Nutrient Guidance',
      slug: 'cellular-vitality-micro-nutrient-guidance',
      shortDescription: 'Educational consultation focusing on plant-derived micro-nutrients and cellular hydration.',
      description: 'Understand how targeted natural compounds and bio-available minerals support mitochondrial energy production and cellular longevity. Learn how to combine trusted partner supplements with nutrient-dense living for optimal everyday wellness.',
      image: 'https://images.unsplash.com/photo-1512290900676-26c2a48f4134?auto=format&fit=crop&w=1000&q=80',
      isPublished: true,
      sortOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'serv-4',
      name: 'Stress Reduction & Mind-Body Alignment',
      slug: 'stress-reduction-mind-body-alignment',
      shortDescription: 'Guided relaxation, breathwork techniques, and biofield resonance therapies for deep restorative calm.',
      description: 'Experience deep nervous system reset through our specialized stress modulation sessions. Combining therapeutic resonance, restorative breathing, and natural energy alignment, this service helps calm an overactive nervous system and improve mental clarity.',
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80',
      isPublished: true,
      sortOrder: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  wellnessCategories: [
    { id: 'cat-1', name: 'General Wellness', slug: 'general-wellness', description: 'Foundational support for everyday vitality and overall wellbeing.', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80' },
    { id: 'cat-2', name: 'Energy & Vitality', slug: 'energy-vitality', description: 'Formulations and tools engineered to support stamina and metabolic energy.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80' },
    { id: 'cat-3', name: 'Digestive Wellness', slug: 'digestive-wellness', description: 'Natural enzyme and gut microbiome support for comfortable digestion.', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },
    { id: 'cat-4', name: 'Bone & Joint Wellness', slug: 'bone-joint-wellness', description: 'Bio-available minerals and botanical extracts for flexible joint function.', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    { id: 'cat-5', name: 'Rest & Relaxation', slug: 'rest-relaxation', description: 'Calming botanical blends for soothing restorative sleep and relaxation.', image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80' },
    { id: 'cat-6', name: 'Healthy Lifestyle', slug: 'healthy-lifestyle', description: 'Clean living essentials to complement an active, balanced daily routine.', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80' },
    { id: 'cat-7', name: 'Immune Wellness', slug: 'immune-wellness', description: 'Antioxidant-rich supplements helping reinforce natural seasonal defenses.', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' }
  ],
  partnerCompanies: [
    {
      id: 'partner-1',
      name: 'DLT Natural Wellness',
      slug: 'dlt-natural-wellness',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'Pioneers in standardized herbal extracts and natural bio-active nutrition since 2012.',
      websiteUrl: 'https://dltwellness.example.com',
      registrationUrl: 'https://dltwellness.example.com/register',
      productUrl: 'https://dltwellness.example.com/catalog',
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'partner-2',
      name: 'Newcam Therapy Systems',
      slug: 'newcam-therapy-systems',
      logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80',
      description: 'Leading developer of home frequency therapy equipment and biofield wellness devices.',
      websiteUrl: 'https://newcamhealth.example.com',
      registrationUrl: 'https://newcamhealth.example.com/partner',
      productUrl: 'https://newcamhealth.example.com/products',
      isFeatured: true,
      isPublished: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'partner-3',
      name: 'BioThera Cellular Labs',
      slug: 'biothera-cellular-labs',
      logo: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=300&q=80',
      description: 'Advanced cellular nutrition supplements focused on mitochondrial energy balance.',
      websiteUrl: 'https://biotheralabs.example.com',
      registrationUrl: null,
      productUrl: 'https://biotheralabs.example.com/shop',
      isFeatured: true,
      isPublished: true,
      sortOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  products: [
    {
      id: 'prod-1',
      name: 'DLT Vitality Essence Multi-Nutrient Elixir',
      slug: 'dlt-vitality-essence-multi-nutrient-elixir',
      shortDescription: 'Cold-extracted liquid botanical complex supporting daily energy and cellular nutrition.',
      description: 'DLT Vitality Essence is crafted from cold-pressed elderberry, organic turmeric, and bio-available trace minerals. Formulated to support natural energy production without synthetic stimulants or artificial preservatives.',
      partnerId: 'partner-1',
      partner: { id: 'partner-1', name: 'DLT Natural Wellness', slug: 'dlt-natural-wellness', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80', websiteUrl: 'https://dltwellness.example.com' },
      categorySlugs: ['energy-vitality', 'general-wellness'],
      categories: [
        { id: 'cat-2', name: 'Energy & Vitality', slug: 'energy-vitality' },
        { id: 'cat-1', name: 'General Wellness', slug: 'general-wellness' }
      ],
      images: [
        { id: 'img-1', url: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80', altText: 'DLT Vitality Essence Bottle', isPrimary: true, sortOrder: 0 }
      ],
      externalUrl: 'https://dltwellness.example.com/products/vitality-essence',
      isFeatured: true,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-2',
      name: 'Newcam Personal Biofield Frequency Device',
      slug: 'newcam-personal-biofield-frequency-device',
      shortDescription: 'Portable micro-current and acoustic frequency resonator for localized relaxation.',
      description: 'The Newcam Biofield Frequency Device utilizes harmonic sound waves and soft electromagnetic frequencies to help soothe physical fatigue and support localized tension release.',
      partnerId: 'partner-2',
      partner: { id: 'partner-2', name: 'Newcam Therapy Systems', slug: 'newcam-therapy-systems', logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80', websiteUrl: 'https://newcamhealth.example.com' },
      categorySlugs: ['rest-relaxation', 'energy-vitality'],
      categories: [
        { id: 'cat-5', name: 'Rest & Relaxation', slug: 'rest-relaxation' },
        { id: 'cat-2', name: 'Energy & Vitality', slug: 'energy-vitality' }
      ],
      images: [
        { id: 'img-2', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', altText: 'Newcam Device', isPrimary: true, sortOrder: 0 }
      ],
      externalUrl: 'https://newcamhealth.example.com/products/biofield-device',
      isFeatured: true,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-3',
      name: 'BioThera Mitochondrial CoQ10 & PQQ Complex',
      slug: 'biothera-mitochondrial-coq10-pqq-complex',
      shortDescription: 'Synergistic cellular antioxidant formula for cellular stamina and mental focus.',
      description: 'BioThera Mitochondrial Complex pairs high-potency Ubiquinol CoQ10 with Pyrroloquinoline Quinone (PQQ) to encourage natural mitochondrial biogenesis and cellular defense against oxidative stress.',
      partnerId: 'partner-3',
      partner: { id: 'partner-3', name: 'BioThera Cellular Labs', slug: 'biothera-cellular-labs', logo: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=300&q=80', websiteUrl: 'https://biotheralabs.example.com' },
      categorySlugs: ['energy-vitality', 'immune-wellness'],
      categories: [
        { id: 'cat-2', name: 'Energy & Vitality', slug: 'energy-vitality' },
        { id: 'cat-7', name: 'Immune Wellness', slug: 'immune-wellness' }
      ],
      images: [
        { id: 'img-3', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', altText: 'BioThera Complex', isPrimary: true, sortOrder: 0 }
      ],
      externalUrl: 'https://biotheralabs.example.com/products/mitochondrial-complex',
      isFeatured: true,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-4',
      name: 'DLT Herbal Digestive Balance Elixir',
      slug: 'dlt-herbal-digestive-balance-elixir',
      shortDescription: 'Gentle plant bitters and peppermint infusion promoting optimal gut harmony.',
      description: 'A traditional formula combining gentian root, ginger, fennel seed, and peppermint oil to encourage natural digestive enzyme secretion and post-meal comfort.',
      partnerId: 'partner-1',
      partner: { id: 'partner-1', name: 'DLT Natural Wellness', slug: 'dlt-natural-wellness', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80', websiteUrl: 'https://dltwellness.example.com' },
      categorySlugs: ['digestive-wellness', 'general-wellness'],
      categories: [
        { id: 'cat-3', name: 'Digestive Wellness', slug: 'digestive-wellness' }
      ],
      images: [
        { id: 'img-4', url: 'https://images.unsplash.com/photo-1512290900676-26c2a48f4134?auto=format&fit=crop&w=800&q=80', altText: 'DLT Elixir', isPrimary: true, sortOrder: 0 }
      ],
      externalUrl: 'https://dltwellness.example.com/products/digestive-balance',
      isFeatured: true,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  blogPosts: [
    {
      id: 'post-1',
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
      category: { id: 'blog-cat-1', name: 'Energy Medicine & Wellness', slug: 'energy-medicine-wellness' },
      seoTitle: '5 Simple Habits for Better Daily Wellness & Energy | Aninta Wellness',
      seoDescription: 'Learn 5 practical daily habits to improve your energetic vitality and daily wellbeing naturally.',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-08-15T10:00:00Z'),
      createdAt: new Date('2026-08-15T10:00:00Z')
    },
    {
      id: 'post-2',
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
      category: { id: 'blog-cat-2', name: 'Nutrition & Lifestyle', slug: 'nutrition-lifestyle' },
      seoTitle: 'Understanding Cellular Hydration | Aninta Wellness Blog',
      seoDescription: 'Explore the science of cellular hydration, trace minerals, and bio-available hydration strategies.',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-08-20T14:30:00Z'),
      createdAt: new Date('2026-08-20T14:30:00Z')
    },
    {
      id: 'post-3',
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
      category: { id: 'blog-cat-2', name: 'Nutrition & Lifestyle', slug: 'nutrition-lifestyle' },
      seoTitle: 'Simple Ways to Support Healthy Digestion | Aninta Wellness',
      seoDescription: 'Discover natural herbs, mindful eating habits, and microbiome support for comfortable digestion.',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-08-28T09:15:00Z'),
      createdAt: new Date('2026-08-28T09:15:00Z')
    }
  ],
  newsletterSubscribers: [
    {
      id: 'sub-1',
      email: 'sample.subscriber@example.com',
      firstName: 'Sarah',
      status: 'ACTIVE',
      brevoSynced: true,
      createdAt: new Date()
    }
  ],
  siteSettings: [
    { key: 'site_name', value: 'Aninta Natural & Energy Medicine Therapy Center' },
    { key: 'tagline', value: 'Natural Wellness. Energy Therapy. Better Living.' },
    { key: 'phone', value: '+2349059916392' },
    { key: 'whatsapp_number', value: '09059916392' },
    { key: 'whatsapp_default_message', value: 'Hello Aninta Therapy Center. I would like to make an enquiry about your energy therapy services and products.' },
    { key: 'email', value: 'nidkwans@gmail.com' },
    { key: 'address', value: 'No 11 Odion Road, Warri, Delta state' },
    { key: 'opening_hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 3:00 PM | Sun: Closed' },
    { key: 'facebook_url', value: 'https://facebook.com/anintawellness' },
    { key: 'instagram_url', value: 'https://instagram.com/anintawellness' },
    { key: 'tiktok_url', value: 'https://tiktok.com/@anintawellness' },
    { key: 'global_disclaimer', value: 'Information provided on this platform is for general educational purposes and is not a substitute for professional medical diagnosis, advice, or treatment. Always consult your physician before starting any wellness program.' }
  ],
  auditLogs: []
};

module.exports = store;
