import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RefreshCw } from 'lucide-react';
import ProductCard from '../../components/public/ProductCard';
import SEOHead from '../../components/public/SEOHead';
import Disclaimer from '../../components/public/Disclaimer';
import { PRODUCT_DISCLAIMER } from '../../utils/disclaimers';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentSearch = searchParams.get('search') || '';
  const currentPartner = searchParams.get('partner') || '';
  const currentCategory = searchParams.get('category') || '';

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    async function loadFilters() {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch('/api/partners').then(r => r.json()),
          fetch('/api/categories').then(r => r.json())
        ]);
        if (pRes.success) setPartners(pRes.data || []);
        if (cRes.success) setCategories(cRes.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadFilters();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (currentSearch) params.set('search', currentSearch);
        if (currentPartner) params.set('partner', currentPartner);
        if (currentCategory) params.set('category', currentCategory);

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data || []);
        }
      } catch (err) {
        console.error('Products fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [currentSearch, currentPartner, currentCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput) newParams.set('search', searchInput);
    else newParams.delete('search');
    setSearchParams(newParams);
  };

  const handlePartnerChange = (e) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set('partner', val);
    else newParams.delete('partner');
    setSearchParams(newParams);
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set('category', val);
    else newParams.delete('category');
    setSearchParams(newParams);
  };

  const handleReset = () => {
    setSearchInput('');
    setSearchParams({});
  };

  return (
    <>
      <SEOHead title="Featured Partner Products Catalog" description="Discover trusted wellness solutions supplied by Aninta's partner company network." />

      <section className="bg-brand-dark-green text-white py-16 text-center">
        <div className="max-w-content mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-3 block">
            Partner Product Discovery
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Featured Partner Products
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Explore curated formulations and bio-energy tools supplied through our trusted partner companies.
          </p>
        </div>
      </section>

      <section className="py-12 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer text={PRODUCT_DISCLAIMER} className="mb-10" />

          {/* Search & Filtering Control Bar */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-earth/15 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Search input */}
              <form onSubmit={handleSearchSubmit} className="md:col-span-5 relative">
                <input
                  type="text"
                  placeholder="Search products or ingredients..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-cream/60 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth"
                />
                <Search className="w-4 h-4 text-brand-text-muted absolute left-3.5 top-3.5" />
              </form>

              {/* Partner Dropdown */}
              <div className="md:col-span-3">
                <select
                  value={currentPartner}
                  onChange={handlePartnerChange}
                  className="w-full px-4 py-3 rounded-xl bg-brand-cream/60 border border-gray-200 text-sm text-brand-text-dark focus:outline-none focus:ring-2 focus:ring-brand-earth"
                >
                  <option value="">All Partner Companies</option>
                  {partners.map((p) => (
                    <option key={p.id} value={p.slug}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Category Dropdown */}
              <div className="md:col-span-3">
                <select
                  value={currentCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-3 rounded-xl bg-brand-cream/60 border border-gray-200 text-sm text-brand-text-dark focus:outline-none focus:ring-2 focus:ring-brand-earth"
                >
                  <option value="">All Wellness Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Reset button */}
              <div className="md:col-span-1 flex justify-end">
                <button
                  onClick={handleReset}
                  className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-brand-text-dark transition title='Reset filters'"
                  aria-label="Reset filters"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="text-center py-16 text-brand-text-muted">Loading product catalog...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl p-8 border border-gray-200">
              <h3 className="font-serif text-2xl font-bold text-brand-dark-green mb-2">No Products Found</h3>
              <p className="text-sm text-brand-text-muted mb-4">Try resetting your search filters or choosing a different category.</p>
              <button onClick={handleReset} className="px-6 py-2.5 rounded-full bg-brand-dark-green text-white text-xs font-semibold">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
