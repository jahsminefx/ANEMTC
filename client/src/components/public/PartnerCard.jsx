import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Package } from 'lucide-react';
import ExternalLink from './ExternalLink';

export default function PartnerCard({ partner }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-earth/15 flex flex-col justify-between h-full">
      <div>
        {/* Partner Header */}
        <div className="flex items-center gap-4 mb-4">
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-14 h-14 rounded-xl object-cover border border-gray-100 shadow-sm"
              loading="lazy"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-brand-light-green text-brand-dark-green font-serif font-bold text-xl flex items-center justify-center border border-brand-med-green/20">
              {partner.name.substring(0, 2)}
            </div>
          )}
          <div>
            <h3 className="font-serif text-xl font-bold text-brand-dark-green">
              {partner.name}
            </h3>
            {partner._count?.products !== undefined && (
              <span className="text-xs text-brand-med-green font-medium flex items-center gap-1 mt-0.5">
                <Package className="w-3.5 h-3.5" />
                {partner._count.products} Product Line{partner._count.products !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-brand-text-muted leading-relaxed line-clamp-3 mb-6">
          {partner.description}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <Link
          to={`/partners/${partner.slug}`}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-brand-light-green hover:bg-brand-med-green hover:text-white text-brand-dark-green transition"
        >
          <span>Explore Partner</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {partner.websiteUrl && (
          <ExternalLink
            href={partner.websiteUrl}
            partnerName={partner.name}
            partnerId={partner.id}
            className="px-4 py-2 text-xs bg-gray-50 hover:bg-gray-100 text-brand-text-dark border border-gray-200"
          >
            Official Site
          </ExternalLink>
        )}
      </div>
    </div>
  );
}
