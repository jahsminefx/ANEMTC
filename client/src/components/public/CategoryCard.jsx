import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-earth/15 bg-white flex flex-col justify-end p-6 min-h-[220px]"
    >
      {/* Background Image / Overlay */}
      {category.image ? (
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-25 group-hover:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-green via-brand-dark-green/80 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark-green to-brand-med-green opacity-95" />
      )}

      {/* Content */}
      <div className="relative z-10 text-white">
        <div className="w-8 h-8 rounded-full bg-brand-earth/90 text-brand-dark-green flex items-center justify-center mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 fill-current" />
        </div>
        <h3 className="font-serif text-xl font-bold text-white mb-1 group-hover:text-brand-earth transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-xs text-emerald-100/90 line-clamp-2 mb-3 leading-relaxed">
            {category.description}
          </p>
        )}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-earth group-hover:translate-x-1 transition-transform">
          <span>Filter Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
