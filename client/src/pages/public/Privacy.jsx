import React from 'react';
import SEOHead from '../../components/public/SEOHead';

export default function Privacy() {
  return (
    <>
      <SEOHead title="Privacy Policy" description="Privacy policy and data protection guidelines for Aninta Therapy Center." />

      <section className="bg-brand-dark-green text-white py-12 text-center">
        <div className="max-w-content mx-auto px-4">
          <h1 className="font-serif text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-emerald-100">Last updated: August 2026</p>
        </div>
      </section>

      <section className="py-16 bg-brand-cream">
        <div className="max-w-article mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-brand-earth/15 space-y-6 text-sm text-brand-text-dark leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-brand-dark-green">1. Information Collection</h2>
            <p>
              Aninta Natural & Energy Medicine Therapy Center values your privacy. We collect minimal personal information (such as first name and email address) only when you voluntarily subscribe to our newsletter or submit an inquiry form.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-dark-green">2. Use of Information</h2>
            <p>
              Your contact information is used strictly to respond to your inquiries, deliver requested wellness tips, and provide updates regarding partner product lines. We do not sell or rent user data to third parties.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-dark-green">3. Analytics & Cookies</h2>
            <p>
              We use aggregated analytics cookies to monitor website performance and traffic flow from social media campaigns. No personal health records are stored on this platform.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-dark-green">4. External Partner Websites</h2>
            <p>
              Our website provides external attribution links to partner company platforms (such as DLT and Newcam). Clicking external links subjects you to the privacy policies of those respective third-party sites.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
