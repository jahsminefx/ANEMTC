import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Leaf, Users, HeartHandshake, ArrowRight, Sparkles, MessageCircle, Phone } from 'lucide-react';
import Hero from '../../components/public/Hero';
import ProductCard from '../../components/public/ProductCard';
import PartnerCard from '../../components/public/PartnerCard';
import BlogCard from '../../components/public/BlogCard';
import CategoryCard from '../../components/public/CategoryCard';
import NewsletterForm from '../../components/public/NewsletterForm';
import WhatsAppButton from '../../components/public/WhatsAppButton';
import CallButton from '../../components/public/CallButton';
import SEOHead from '../../components/public/SEOHead';

export default function Home() {
  const [services, setServices] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [partners, setPartners] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [servRes, prodRes, catRes, partRes, blogRes] = await Promise.all([
          fetch('/api/services').then(r => r.json()),
          fetch('/api/products?featured=true&limit=8').then(r => r.json()),
          fetch('/api/categories').then(r => r.json()),
          fetch('/api/partners').then(r => r.json()),
          fetch('/api/blog?limit=3').then(r => r.json())
        ]);

        if (servRes.success) setServices(servRes.data || []);
        if (prodRes.success) setFeaturedProducts(prodRes.data || []);
        if (catRes.success) setCategories(catRes.data || []);
        if (partRes.success) setPartners(partRes.data || []);
        if (blogRes.success) setLatestPosts(blogRes.data || []);
      } catch (err) {
        console.error('Homepage fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const valuePoints = [
    {
      icon: BookOpen,
      title: 'Wellness Education',
      description: 'Evidence-informed articles and guides demystifying energy medicine.'
    },
    {
      icon: Leaf,
      title: 'Natural Solutions',
      description: 'Non-invasive therapies and plant-derived micro-nutrient formulations.'
    },
    {
      icon: Users,
      title: 'Trusted Partners',
      description: 'Rigorous vetting of affiliated wellness brand networks and systems.'
    },
    {
      icon: HeartHandshake,
      title: 'Personal Support',
      description: 'Direct 1-on-1 practitioner consultations via instant WhatsApp & phone.'
    }
  ];

  return (
    <>
      <SEOHead title="Natural Wellness & Energy Therapy" />

      {/* SECTION 1: HERO */}
      <Hero />

      {/* SECTION 2: TRUST / VALUE POINTS */}
      <section className="py-12 bg-white border-y border-brand-earth/10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-start p-6 rounded-2xl bg-brand-cream/40 border border-brand-earth/10 hover:border-brand-earth/30 transition">
                  <div className="w-12 h-12 rounded-xl bg-brand-light-green text-brand-dark-green flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-brand-dark-green mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT ANINTA */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80"
                  alt="Aninta Wellness Center Practitioners"
                  className="w-full h-[380px] sm:h-[450px] object-cover"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark-green mb-6 leading-tight">
                Restoring Bio-Energy Balance for Sustainable Everyday Wellbeing
              </h2>
              <p className="text-base text-brand-text-muted leading-relaxed mb-6">
                Aninta Natural & Energy Medicine Therapy Center bridges modern energy resonance scanning with time-tested natural wellness principles. We empower individuals to understand their body’s subtle energetic cues and connect them with certified partner products.
              </p>
              <p className="text-sm text-brand-text-muted leading-relaxed mb-8">
                Rather than treating symptoms in isolation, our non-invasive guidance focuses on restoring cellular harmony, optimizing daily stress resilience, and encouraging positive lifestyle choices.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-dark-green hover:bg-brand-med-green text-white font-semibold text-sm transition"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICES */}
      <section className="py-20 bg-white border-t border-brand-earth/10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2 block">
              Practitioner Offerings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark-green mb-4">
              Energy Therapy & Consultations
            </h2>
            <p className="text-sm text-brand-text-muted leading-relaxed">
              Discover personalized energy assessment, biofield balancing, and cellular micro-nutrient guidance tailored to your health goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-brand-cream/40 rounded-2xl overflow-hidden border border-brand-earth/15 p-6 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  )}
                  <h3 className="font-serif text-xl font-bold text-brand-dark-green mb-3">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark-green hover:text-brand-earth transition"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED PRODUCTS */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2 block">
                Partner Showcase
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark-green">
                Featured Wellness Products
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark-green hover:text-brand-earth transition"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: WELLNESS CATEGORIES */}
      <section className="py-20 bg-white border-y border-brand-earth/10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2 block">
              Compliant Support Areas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark-green mb-4">
              Explore Wellness Categories
            </h2>
            <p className="text-sm text-brand-text-muted">
              Products and therapies organized strictly into non-medical wellness support categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: PARTNER COMPANIES */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2 block">
              Official Partners
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark-green mb-4">
              Affiliated Company Networks
            </h2>
            <p className="text-sm text-brand-text-muted">
              We collaborate with trusted manufacturers and developers of certified bio-active solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: BLOG */}
      <section className="py-20 bg-white border-t border-brand-earth/10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2 block">
                Educational Hub
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark-green">
                Latest Wellness Articles
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark-green hover:text-brand-earth transition"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: NEWSLETTER */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterForm />
      </div>

      {/* SECTION 10: FINAL CONTACT CTA */}
      <section className="py-16 bg-brand-cream border-t border-brand-earth/10 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark-green mb-4">
            Have Questions? We're Here to Help.
          </h2>
          <p className="text-sm sm:text-base text-brand-text-muted mb-8">
            Connect directly with an Aninta practitioner for service details, partner inquiries, or personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton context="final_cta" className="w-full sm:w-auto px-8 py-4">
              Chat on WhatsApp
            </WhatsAppButton>
            <CallButton context="final_cta" className="w-full sm:w-auto px-8 py-4">
              Call Us
            </CallButton>
          </div>
        </div>
      </section>
    </>
  );
}
