import React, { useState, useEffect } from 'react';
import PartnerCard from '../../components/public/PartnerCard';
import SEOHead from '../../components/public/SEOHead';
import Disclaimer from '../../components/public/Disclaimer';

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/partners')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPartners(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEOHead title="Affiliated Partner Companies" description="Explore Aninta's network of verified wellness partner companies including DLT and Newcam." />

      <section className="bg-brand-dark-green text-white py-16 text-center">
        <div className="max-w-content mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-3 block">
            Partner Network
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Partner Companies & Brands
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            We collaborate with leading manufacturers and developers of certified bio-active formulations and energy therapy devices.
          </p>
        </div>
      </section>

      <section className="py-16 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer className="mb-12" />

          {loading ? (
            <div className="text-center py-12 text-brand-text-muted">Loading partner companies...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partners.map(partner => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
