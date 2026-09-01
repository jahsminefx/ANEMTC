import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';

export default function ProductCard({ product }) {
  const primaryImage = product.images?.find(i => i.isPrimary)?.url || 
                       product.images?.[0]?.url || 
                       'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-earth/15 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-brand-cream/50">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Partner Badge */}
        {product.partner && (
          <div className="absolute top-3 left-3 bg-brand-dark-green/90 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
            {product.partner.name}
          </div>
        )}

        {/* Featured Tag */}
        {product.isFeatured && (
          <div className="absolute top-3 right-3 bg-brand-earth text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            Featured
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {product.categories.slice(0, 2).map((cat) => (
                <span key={cat.id} className="text-[11px] text-brand-med-green font-medium flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-serif text-lg font-bold text-brand-dark-green group-hover:text-brand-earth transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-brand-text-muted line-clamp-3 mb-4 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-brand-earth font-medium uppercase tracking-wider">Partner Solution</span>
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-dark-green hover:text-brand-earth transition"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
