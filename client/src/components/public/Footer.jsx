import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import Disclaimer from './Disclaimer';
import { useSettings } from '../../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  const phone = settings.phone || '+1 (800) 555-2646';
  const email = settings.email || 'contact@anintawellness.com';
  const address = settings.address || '100 Serenity Boulevard, Suite 400, San Francisco, CA 94107';

  return (
    <footer className="bg-brand-dark-green text-white pt-16 pb-24 lg:pb-12 border-t border-brand-earth/20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-earth flex items-center justify-center text-brand-dark-green shadow-sm">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  ANINTA
                </span>
                <span className="text-[10px] tracking-widest uppercase text-brand-earth font-semibold">
                  Natural & Energy Therapy
                </span>
              </div>
            </Link>
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              {settings.tagline || 'A modern digital platform dedicated to holistic energy therapy, wellness education, and curated partner solutions.'}
            </p>
            <div className="flex items-center gap-3 text-brand-earth">
              {settings.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-emerald-900/80 hover:bg-brand-earth hover:text-brand-dark-green transition" title="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-emerald-900/80 hover:bg-brand-earth hover:text-brand-dark-green transition" title="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-brand-earth mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              <li><Link to="/about" className="hover:text-white transition">About Aninta</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Energy Therapy Services</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Featured Product Catalog</Link></li>
              <li><Link to="/partners" className="hover:text-white transition">Partner Companies</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Wellness Blog & Articles</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact & Enquiries</Link></li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-brand-earth mb-4">Compliance</h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              <li><Link to="/disclaimer" className="hover:text-white transition">Health Disclaimer</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Use</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition text-xs opacity-75">Staff Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-brand-earth mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-emerald-100/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-earth shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-earth shrink-0" />
                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition">{phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-earth shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition">{email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Global Footer Health Disclaimer */}
        <div className="py-8 border-b border-emerald-900/60">
          <Disclaimer variant="dark" />
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-4">
          <p>© {new Date().getFullYear()} {settings.site_name || 'Aninta Natural & Energy Medicine Therapy Center'}. All rights reserved.</p>
          <p className="text-center sm:text-right">Designed for high-converting wellness discovery without e-commerce overhead.</p>
        </div>
      </div>
    </footer>
  );
}
