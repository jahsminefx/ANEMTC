/**
 * Analytics Tracking Abstraction for Aninta Therapy Center
 * Supports Google Analytics (gtag), custom event handlers, and console reporting
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initAnalytics() {
  if (GA_ID && GA_ID !== 'G-XXXXXXXXXX' && typeof window !== 'undefined') {
    // Inject Google Analytics script dynamically if ID is provided
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }
}

export function trackEvent(eventName, properties = {}) {
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...properties
  };

  // Console logging in dev mode
  if (import.meta.env.DEV) {
    console.log(`📊 [Analytics Event]: ${eventName}`, properties);
  }

  // Google Analytics trigger if loaded
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}

// Pre-defined event tracking helpers
export const Analytics = {
  viewProduct: (productId, productName, partnerName) => 
    trackEvent('product_view', { productId, productName, partnerName }),
  
  clickPartnerExternalLink: (partnerId, partnerName, destinationUrl) => 
    trackEvent('partner_external_click', { partnerId, partnerName, destinationUrl }),
  
  clickWhatsApp: (context = 'general', productName = null) => 
    trackEvent('whatsapp_click', { context, productName }),
  
  clickPhone: (context = 'general') => 
    trackEvent('phone_click', { context }),
  
  subscribeNewsletter: (source = 'homepage_footer') => 
    trackEvent('newsletter_subscribe', { source }),
  
  viewArticle: (articleId, articleTitle, category) => 
    trackEvent('blog_article_view', { articleId, articleTitle, category })
};
