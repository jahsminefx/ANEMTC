import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import CallButton from './CallButton';

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Partners', path: '/partners' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-dark-green/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-brand-cream h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-brand-earth/20">
            <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-dark-green flex items-center justify-center text-brand-earth">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="font-serif text-xl font-bold text-brand-dark-green">
                ANINTA
              </span>
            </Link>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-brand-text-muted hover:text-brand-dark-green hover:bg-brand-light-green transition"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-8 flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `text-base font-medium py-2 px-3 rounded-xl transition ${
                    isActive
                      ? 'bg-brand-dark-green text-white font-semibold'
                      : 'text-brand-text-dark hover:bg-brand-light-green'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-brand-earth/20 flex flex-col gap-3">
          <WhatsAppButton context="mobile_drawer" className="w-full">
            WhatsApp Us
          </WhatsAppButton>
          <CallButton context="mobile_drawer" className="w-full">
            Call Us
          </CallButton>
        </div>
      </div>
    </div>
  );
}
