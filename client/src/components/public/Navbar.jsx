import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

export default function Navbar({ onOpenMobileMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-cream/95 backdrop-blur-md shadow-md py-3 border-b border-amber-900/5' 
          : 'bg-brand-cream py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-earth rounded-lg p-1">
          <div className="w-10 h-10 rounded-full bg-brand-dark-green flex items-center justify-center text-brand-earth shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-dark-green leading-none">
              ANINTA
            </span>
            <span className="text-[10px] tracking-widest uppercase text-brand-earth font-semibold mt-0.5">
              Natural & Energy Therapy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 hover:text-brand-dark-green ${
                  isActive
                    ? 'text-brand-dark-green font-semibold border-b-2 border-brand-earth pb-1'
                    : 'text-brand-text-muted'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <WhatsAppButton context="navbar_desktop">
            WhatsApp Us
          </WhatsAppButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2.5 rounded-xl text-brand-dark-green hover:bg-brand-light-green/60 transition focus:outline-none focus:ring-2 focus:ring-brand-earth"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
