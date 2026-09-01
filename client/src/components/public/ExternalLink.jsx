import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { Analytics } from '../../utils/analytics';

export default function ExternalLink({ href, partnerName, partnerId, children, className = '' }) {
  const handleClick = (e) => {
    if (partnerName) {
      Analytics.clickPartnerExternalLink(partnerId || 'partner', partnerName, href);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-earth focus:ring-offset-2 ${className}`}
    >
      <span>{children}</span>
      <ExternalLinkIcon className="w-4 h-4 shrink-0" />
    </a>
  );
}
