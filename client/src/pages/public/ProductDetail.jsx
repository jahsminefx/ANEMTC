import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag, ShieldCheck } from 'lucide-react';
import SEOHead from '../../components/public/SEOHead';
import WhatsAppButton from '../../components/public/WhatsAppButton';
import CallButton from '../../components/public/CallButton';
import ExternalLink from '../../components/public/ExternalLink';
import ProductCard from '../../components/public/ProductCard';
import Disclaimer from '../../components/public/Disclaimer';
import { PRODUCT_DISCLAIMER, PARTNER_ATTRIBUTION_NOTICE } from '../../utils/disclaimers';
import { Analytics } from '../../utils/analytics';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProduct(data.data);
          setRelated(data.related || []);
          setSelectedImage(0);
          Analytics.viewProduct(data.data.id, data.data.name, data.data.partner?.name);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-24 text-brand-text-muted">Loading product specifications...</div>;
  if (!product) return <div className="text-center py-24 text-brand-text-muted">Product not found.</div>;

  const images = product.images && product.images.length > 0
    ? product.images.map(i => i.url)
    : ['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80'];

  return (
    <>
      <SEOHead title={product.name} description={product.shortDescription} />

      <section className="py-12 bg-white border-b border-brand-earth/10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-earth hover:text-brand-dark-green mb-8 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Products Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Gallery Column */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden bg-brand-cream/40 border border-brand-earth/15 mb-4 aspect-square shadow-md">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        selectedImage === idx ? 'border-brand-earth scale-95 shadow-sm' : 'border-gray-200 opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Actions Column */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Partner Attribution */}
                {product.partner && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light-green border border-brand-med-green/20 text-brand-dark-green text-xs font-semibold mb-4">
                    <ShieldCheck className="w-4 h-4 text-brand-earth" />
                    <span>Supplied by {product.partner.name}</span>
                  </div>
                )}

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark-green mb-4">
                  {product.name}
                </h1>

                <p className="text-base text-brand-text-muted leading-relaxed mb-6">
                  {product.shortDescription}
                </p>

                {/* Categories */}
                {product.categories && product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {product.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/categories/${cat.slug}`}
                        className="inline-flex items-center gap-1 text-xs bg-gray-100 hover:bg-brand-light-green text-brand-text-dark px-3 py-1 rounded-full transition"
                      >
                        <Tag className="w-3 h-3 text-brand-earth" />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Partner Notice Box */}
                <div className="bg-emerald-50/80 border border-emerald-200/70 p-4 rounded-2xl mb-8 text-xs text-emerald-950 leading-relaxed">
                  <strong className="font-semibold block mb-1">Partner Solution Attribution:</strong>
                  {PARTNER_ATTRIBUTION_NOTICE}
                </div>
              </div>

              {/* Action Buttons Stack */}
              <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
                {product.externalUrl && (
                  <ExternalLink
                    href={product.externalUrl}
                    partnerName={product.partner?.name}
                    partnerId={product.partner?.id}
                    className="w-full py-4 text-base bg-brand-earth hover:bg-amber-700 text-white font-semibold shadow-md"
                  >
                    Visit Official Partner Website
                  </ExternalLink>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <WhatsAppButton
                    context="product_detail"
                    productName={product.name}
                    className="w-full py-3.5 text-sm font-semibold"
                  >
                    Inquire on WhatsApp
                  </WhatsAppButton>

                  <CallButton
                    context="product_detail"
                    className="w-full py-3.5 text-sm font-semibold bg-brand-dark-green hover:bg-brand-med-green text-white"
                  >
                    Call Aninta
                  </CallButton>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Description & Disclaimers */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-article mx-auto">
            
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-brand-earth/15 mb-12">
              <h2 className="font-serif text-2xl font-bold text-brand-dark-green mb-6">
                Product Details & Formulation Summary
              </h2>
              <div className="prose prose-emerald text-brand-text-dark text-base leading-relaxed space-y-4 whitespace-pre-line">
                {product.description}
              </div>
            </div>

            <Disclaimer text={PRODUCT_DISCLAIMER} className="mb-16" />

            {/* Related Products */}
            {related.length > 0 && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-dark-green mb-6 text-center">
                  Related Partner Solutions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {related.map((relProd) => (
                    <ProductCard key={relProd.id} product={relProd} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}
