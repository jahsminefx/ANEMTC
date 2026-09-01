import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import ProductCard from '../../components/public/ProductCard';
import SEOHead from '../../components/public/SEOHead';
import Disclaimer from '../../components/public/Disclaimer';

export default function CategoryProducts() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/categories/${slug}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) setData(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-24 text-brand-text-muted">Loading category products...</div>;
  if (!data || !data.category) return <div className="text-center py-24 text-brand-text-muted">Category not found.</div>;

  const { category, products } = data;

  return (
    <>
      <SEOHead title={`${category.name} Products`} description={category.description} />

      <section className="bg-brand-dark-green text-white py-16 text-center">
        <div className="max-w-content mx-auto px-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-earth hover:text-white mb-4 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to All Products
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-base text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
            {category.description || 'Wellness support items categorized for simple product discovery.'}
          </p>
        </div>
      </section>

      <section className="py-12 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer className="mb-10" />

          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl p-8 border border-gray-200">
              <h3 className="font-serif text-xl font-bold text-brand-dark-green mb-2">No Products in this Category</h3>
              <p className="text-sm text-brand-text-muted mb-4">Explore our complete catalog for other wellness solutions.</p>
              <Link to="/products" className="px-6 py-2.5 rounded-full bg-brand-dark-green text-white text-xs font-semibold">
                Browse Full Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
