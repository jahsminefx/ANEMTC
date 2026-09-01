import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEOHead from '../../components/public/SEOHead';

export default function NotFound() {
  return (
    <>
      <SEOHead title="Page Not Found (404)" />

      <section className="py-24 bg-brand-cream text-center min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <span className="font-serif text-6xl font-bold text-brand-earth block mb-2">404</span>
          <h1 className="font-serif text-3xl font-bold text-brand-dark-green mb-4">
            Page Not Found
          </h1>
          <p className="text-sm text-brand-text-muted mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-dark-green text-white font-semibold text-sm hover:bg-brand-med-green transition"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-300 text-brand-text-dark font-semibold text-sm hover:bg-gray-50 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Products</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
