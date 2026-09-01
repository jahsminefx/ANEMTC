import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import SEOHead from '../../components/public/SEOHead';
import WhatsAppButton from '../../components/public/WhatsAppButton';
import Disclaimer from '../../components/public/Disclaimer';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success) setServices(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEOHead title="Energy Therapy Services & Consultations" description="Browse Aninta's energy therapy assessments, biofield balancing, cellular vitality, and stress reduction consultations." />

      <section className="bg-brand-dark-green text-white py-16 text-center">
        <div className="max-w-content mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-3 block">
            Practitioner Services
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Energy Therapy Services & Consultations
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Non-invasive frequency assessments, biofield balancing, and customized lifestyle consultations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer className="mb-12" />

          {loading ? (
            <div className="text-center py-12 text-brand-text-muted">Loading services...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-brand-earth/15 flex flex-col justify-between">
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-56 object-cover"
                    />
                  )}
                  <div className="p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-brand-dark-green mb-3">
                        {service.name}
                      </h2>
                      <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark-green hover:text-brand-earth transition"
                      >
                        <span>Read Full Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <WhatsAppButton context="services_list" productName={service.name} className="px-4 py-2 text-xs">
                        Book Consultation
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
