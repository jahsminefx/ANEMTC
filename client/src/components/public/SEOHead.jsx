import React, { useEffect } from 'react';

export default function SEOHead({ title, description, image, canonical, type = 'website' }) {
  const siteTitle = 'Aninta Natural & Energy Medicine Therapy Center';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || 'Explore energy therapy services, educational articles, and trusted partner wellness solutions at Aninta Therapy Center.';

  useEffect(() => {
    document.title = fullTitle;

    // Update Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
    }
    descMeta.content = metaDescription;

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = fullTitle;

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = metaDescription;

  }, [fullTitle, metaDescription]);

  return null;
}
