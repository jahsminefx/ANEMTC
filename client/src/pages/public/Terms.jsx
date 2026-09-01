import React from 'react';
import SEOHead from '../../components/public/SEOHead';

export default function Terms() {
  return (
    <>
      <SEOHead title="Terms of Use" description="Terms of use governing Aninta Therapy Center website." />

      <section className="bg-brand-dark-green text-white py-12 text-center">
        <div className="max-w-content mx-auto px-4">
          <h1 className="font-serif text-4xl font-bold mb-2">Terms of Use</h1>
          <p className="text-sm text-emerald-100">Agreement for accessing Aninta platform</p>
        </div>
      </section>

      <section className="py-16 bg-brand-cream">
        <div className="max-w-article mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-brand-earth/15 space-y-6 text-sm text-brand-text-dark leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-brand-dark-green">1. Acceptance of Terms</h2>
            <p>
              By accessing or navigating the website of Aninta Natural & Energy Medicine Therapy Center, you agree to comply with these Terms of Use and all applicable laws and regulations.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-dark-green">2. Intellectual Property</h2>
            <p>
              All original content, logos, service descriptions, and media assets published on this site are the intellectual property of Aninta or its affiliated partner networks. Unauthorized reproduction is strictly prohibited.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-dark-green">3. Limitation of Liability</h2>
            <p>
              Aninta Therapy Center is not liable for any decisions made based on general educational articles or third-party partner products accessed through external links.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
