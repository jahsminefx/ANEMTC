import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-cream via-brand-cream to-brand-light-green/30 pt-8 pb-16 lg:py-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light-green border border-brand-med-green/20 text-brand-dark-green text-xs sm:text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-brand-earth fill-current" />
              <span className="tracking-wide uppercase text-[11px] font-bold">
                ANINTA NATURAL & ENERGY MEDICINE THERAPY CENTER
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark-green tracking-tight leading-[1.15] mb-6">
              Natural Wellness. <br />
              <span className="text-brand-earth italic font-normal">Energy Therapy.</span> <br />
              Better Living.
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-brand-text-muted leading-relaxed mb-8 max-w-2xl">
              Explore wellness services, educational resources, featured products, and trusted partner solutions designed to support healthier lifestyle choices.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-dark-green hover:bg-brand-med-green text-white font-semibold text-base shadow-lg shadow-brand-dark-green/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-earth"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <WhatsAppButton context="hero_cta" className="px-8 py-4 text-base font-semibold">
                Chat on WhatsApp
              </WhatsAppButton>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-brand-earth/20 text-xs sm:text-sm text-brand-text-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-earth" />
                <span>Certified Energy Practitioners</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-earth" />
                <span>Verified Partner Networks</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Card Framing */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-brand-earth/10 rounded-3xl blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-brand-med-green/10 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80"
                  alt="Aninta Energy Medicine Consultation & Relaxation"
                  className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-brand-earth/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-light-green flex items-center justify-center text-brand-dark-green shrink-0 font-serif font-bold text-lg">
                      🌿
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-brand-dark-green">Holistic Vitality & Balance</h4>
                      <p className="text-xs text-brand-text-muted">Empowering your natural wellness journey without complex e-commerce steps.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
