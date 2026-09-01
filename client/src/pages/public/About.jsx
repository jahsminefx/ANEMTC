import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/public/SEOHead';
import WhatsAppButton from '../../components/public/WhatsAppButton';
import CallButton from '../../components/public/CallButton';

export default function About() {
  return (
    <>
      <SEOHead title="About Aninta Therapy Center" description="Learn about Aninta's philosophy, mission, energy medicine approach, and partner company network." />

      {/* Header Banner */}
      <section className="bg-brand-dark-green text-white py-16 sm:py-20 text-center">
        <div className="max-w-content mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-3 block">
            Who We Are
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            About Aninta Therapy Center
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Pioneering non-invasive bio-energy assessment, natural wellness education, and trusted partner product discovery.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2 block">Our Story</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark-green mb-6">
                Founded on the Principles of Natural Energy Resonance
              </h2>
              <p className="text-base text-brand-text-muted leading-relaxed mb-4">
                Aninta Natural & Energy Medicine Therapy Center was established to provide an alternative, educational sanctuary for individuals seeking holistic vitality.
              </p>
              <p className="text-sm text-brand-text-muted leading-relaxed">
                Recognizing that stress, environmental pollutants, and dietary deficiencies disrupt biological frequency fields, our center offers certified practitioner assessments paired with curated partner supplements.
              </p>
            </div>
            <div className="lg:col-span-6">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80"
                alt="Aninta Therapy Room"
                className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-xl border-4 border-brand-cream"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-brand-cream border-y border-brand-earth/10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-earth/15">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2 block">Our Mission</span>
              <h3 className="font-serif text-2xl font-bold text-brand-dark-green mb-4">
                Empower Through Knowledge & Resonance
              </h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">
                To educate and guide our community toward healthier lifestyle choices by combining non-invasive energy therapy consultations with high-potency, standardized natural products supplied by verified partner brands.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-earth/15">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2 block">Our Vision</span>
              <h3 className="font-serif text-2xl font-bold text-brand-dark-green mb-4">
                A Globally Respected Wellness Discovery Hub
              </h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">
                To become a trusted digital hub where social media campaign traffic easily accesses transparent health education, direct practitioner advice via instant messaging, and direct partner platforms without e-commerce clutter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do & Our Approach */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80"
                alt="Mind-Body Alignment Consultation"
                className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-xl border-4 border-brand-cream"
              />
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-2 block">Our Approach</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark-green mb-6">
                What We Do & How We Support You
              </h2>
              <ul className="space-y-4 text-sm text-brand-text-muted">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-light-green text-brand-dark-green flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                  <span><strong>Bio-Energy Assessment:</strong> Non-invasive electromagnetic frequency scans to evaluate cellular vitality.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-light-green text-brand-dark-green flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                  <span><strong>Lifestyle & Micro-Nutrient Guidance:</strong> Customized advice incorporating plant-based micro-nutrients and hydration.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-light-green text-brand-dark-green flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                  <span><strong>Partner Solution Discovery:</strong> Connecting clients directly with partner companies like DLT and Newcam.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-brand-cream border-t border-brand-earth/10 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-brand-dark-green mb-4">
            Connect With Our Practitioners
          </h2>
          <p className="text-sm text-brand-text-muted mb-6">
            Have questions about our therapy options or partner product lines? Reach out directly via WhatsApp or phone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton context="about_cta">Chat on WhatsApp</WhatsAppButton>
            <CallButton context="about_cta">Call Us</CallButton>
          </div>
        </div>
      </section>
    </>
  );
}
