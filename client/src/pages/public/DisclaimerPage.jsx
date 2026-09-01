import React from 'react';
import SEOHead from '../../components/public/SEOHead';
import Disclaimer from '../../components/public/Disclaimer';

export default function DisclaimerPage() {
  return (
    <>
      <SEOHead title="Wellness Information Disclaimer" description="Comprehensive health and medical disclaimer for Aninta Therapy Center." />

      <section className="bg-brand-dark-green text-white py-12 text-center">
        <div className="max-w-content mx-auto px-4">
          <h1 className="font-serif text-4xl font-bold mb-2">Wellness & Medical Disclaimer</h1>
          <p className="text-sm text-emerald-100">Important regulatory notice for visitors</p>
        </div>
      </section>

      <section className="py-16 bg-brand-cream">
        <div className="max-w-article mx-auto px-4">
          <Disclaimer className="mb-8" />

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-brand-earth/15 space-y-6 text-sm text-brand-text-dark leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-brand-dark-green">General Educational Scope</h2>
            <p>
              All content on this website—including energy therapy descriptions, botanical supplement overviews, blog posts, and partner company spotlights—is published solely for general informational and educational purposes.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-dark-green">Not Medical Advice</h2>
            <p>
              Nothing presented on Aninta Therapy Center constitutes medical diagnosis, treatment, cure, or prevention of any disease or physiological condition. Always consult your licensed physician or healthcare provider before beginning any new diet, supplement regimen, or biofield therapy.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-dark-green">No E-Commerce Transactions</h2>
            <p>
              Aninta Natural & Energy Medicine Therapy Center does not conduct online direct retail checkout or process monetary transactions for products on this platform. Featured products are manufactured and supplied independently by partner companies.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
