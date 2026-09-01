import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import SEOHead from '../../components/public/SEOHead';
import WhatsAppButton from '../../components/public/WhatsAppButton';
import CallButton from '../../components/public/CallButton';
import Disclaimer from '../../components/public/Disclaimer';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/services/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setService(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-24 text-brand-text-muted">Loading service details...</div>;
  if (!service) return <div className="text-center py-24 text-brand-text-muted">Service not found.</div>;

  return (
    <>
      <SEOHead title={service.name} description={service.shortDescription} />

      <section className="py-12 bg-white border-b border-brand-earth/10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-earth hover:text-brand-dark-green mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2 block">Energy Therapy Consultation</span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark-green mb-4">
                {service.name}
              </h1>
              <p className="text-lg text-brand-text-muted leading-relaxed mb-6">
                {service.shortDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <WhatsAppButton context="service_detail" productName={service.name} className="px-6 py-3.5">
                  Book This Service on WhatsApp
                </WhatsAppButton>
                <CallButton context="service_detail" className="px-6 py-3.5">
                  Call Center
                </CallButton>
              </div>
            </div>

            {service.image && (
              <div className="lg:col-span-5">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-xl border-4 border-brand-cream"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-cream">
        <div className="max-w-article mx-auto px-4">
          <Disclaimer className="mb-10" />

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-brand-earth/15">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark-green mb-6">
              Overview & What to Expect
            </h2>
            <div className="prose prose-emerald text-brand-text-dark text-base leading-relaxed space-y-4 whitespace-pre-line mb-8">
              {service.description}
            </div>

            <div className="pt-8 border-t border-gray-100">
              <h3 className="font-serif text-xl font-bold text-brand-dark-green mb-4">Key Benefits & Process:</h3>
              <ul className="space-y-3 text-sm text-brand-text-muted">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-earth shrink-0 mt-0.5" />
                  <span>Non-invasive electromagnetic frequency scanning and evaluation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-earth shrink-0 mt-0.5" />
                  <span>Personalized practitioner consultation to review energetic stressors.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-earth shrink-0 mt-0.5" />
                  <span>Customized micro-nutrient and partner solution recommendations.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
