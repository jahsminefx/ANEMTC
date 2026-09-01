import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, ShieldCheck } from 'lucide-react';
import SEOHead from '../../components/public/SEOHead';
import ProductCard from '../../components/public/ProductCard';
import ExternalLink from '../../components/public/ExternalLink';
import WhatsAppButton from '../../components/public/WhatsAppButton';
import CallButton from '../../components/public/CallButton';
import Disclaimer from '../../components/public/Disclaimer';

export default function PartnerDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/partners/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setData(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-24 text-brand-text-muted">Loading partner information...</div>;
  if (!data || !data.partner) return <div className="text-center py-24 text-brand-text-muted">Partner company not found.</div>;

  const { partner, products } = data;

  return (
    <>
      <SEOHead title={`${partner.name} - Partner Profile`} description={partner.description} />

      <section className="py-12 bg-white border-b border-brand-earth/10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/partners" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-earth hover:text-brand-dark-green mb-8 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Partners Showcase
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-brand-cream/50 p-8 rounded-3xl border border-brand-earth/15">
            <div className="flex items-center gap-6">
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-brand-dark-green text-brand-earth font-serif font-bold text-3xl flex items-center justify-center">
                  {partner.name.substring(0, 2)}
                </div>
              )}

              <div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-brand-earth uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Partner Network
                </div>
                <h1 className="font-serif text-3xl font-bold text-brand-dark-green">
                  {partner.name}
                </h1>
                <p className="text-sm text-brand-text-muted mt-1 max-w-xl leading-relaxed">
                  {partner.description}
                </p>
              </div>
            </div>

            {partner.websiteUrl && (
              <ExternalLink
                href={partner.websiteUrl}
                partnerName={partner.name}
                partnerId={partner.id}
                className="w-full md:w-auto px-6 py-3.5 bg-brand-dark-green hover:bg-brand-med-green text-white font-semibold text-sm shadow-md"
              >
                Visit Official Website
              </ExternalLink>
            )}
          </div>
        </div>
      </section>

      {/* Partner Products Grid */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer className="mb-12" />

          <h2 className="font-serif text-2xl font-bold text-brand-dark-green mb-6">
            Product Line Supplied by {partner.name}
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl p-6 border border-gray-200">
              <p className="text-sm text-brand-text-muted">No products currently listed for this partner.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Assistance Banner */}
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-brand-earth/15 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-brand-dark-green mb-2">Need Assistance?</h3>
            <p className="text-xs sm:text-sm text-brand-text-muted mb-6">
              Inquire about {partner.name} products directly with Aninta practitioners.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <WhatsAppButton context="partner_detail" className="w-full sm:w-auto px-6 py-3">
                Chat on WhatsApp
              </WhatsAppButton>
              <CallButton context="partner_detail" className="w-full sm:w-auto px-6 py-3">
                Call Aninta
              </CallButton>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
