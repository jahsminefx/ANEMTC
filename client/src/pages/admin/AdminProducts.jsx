import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Check, X, Search, Sparkles } from 'lucide-react';
import AdminTopBar from '../../components/admin/AdminTopBar';
import ImageUploader from '../../components/admin/ImageUploader';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/public/SEOHead';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { token } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    partnerId: '',
    categoryIds: [],
    images: [''],
    externalUrl: '',
    isFeatured: false,
    isPublished: true
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, partRes, catRes] = await Promise.all([
        fetch('/api/admin/products', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
        fetch('/api/admin/partners', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
        fetch('/api/admin/categories', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
      ]);

      if (prodRes.success) setProducts(prodRes.data || []);
      if (partRes.success) setPartners(partRes.data || []);
      if (catRes.success) setCategories(catRes.data || []);
    } catch (err) {
      console.error(err);
      addToast('Failed to fetch admin products data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleOpenNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      shortDescription: '',
      description: '',
      partnerId: partners[0]?.id || '',
      categoryIds: [],
      images: [''],
      externalUrl: '',
      isFeatured: false,
      isPublished: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      description: product.description,
      partnerId: product.partnerId,
      categoryIds: product.categories ? product.categories.map(c => c.id) : [],
      images: product.images && product.images.length > 0 ? product.images.map(i => i.url) : [''],
      externalUrl: product.externalUrl || '',
      isFeatured: product.isFeatured,
      isPublished: product.isPublished
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save product');
      }

      addToast(`Product ${editingProduct ? 'updated' : 'created'} successfully!`, 'success');
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Error saving product.', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        addToast('Product deleted.', 'info');
        fetchData();
      }
    } catch (err) {
      addToast('Failed to delete product.', 'error');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.partner?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEOHead title="Manage Products - Admin" />
      <AdminTopBar title="Product Catalog Management" />

      <main className="p-6 max-w-content mx-auto space-y-6">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search products by name or partner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth bg-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </div>

          <button
            onClick={handleOpenNew}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-dark-green hover:bg-brand-med-green text-white text-sm font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Partner</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/60">
                    <td className="py-3 px-4 font-semibold text-brand-dark-green">
                      {p.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{p.partner?.name || 'Unassigned'}</td>
                    <td className="py-3 px-4">
                      {p.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-amber-100 text-amber-900 font-semibold px-2.5 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Standard</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {p.isPublished ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium text-xs">Published</span>
                      ) : (
                        <span className="text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium text-xs">Draft</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-serif text-2xl font-bold text-brand-dark-green">
                  {editingProduct ? 'Edit Product Record' : 'Create New Product Record'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Partner Company *</label>
                  <select
                    required
                    value={formData.partnerId}
                    onChange={(e) => setFormData({ ...formData, partnerId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  >
                    <option value="">Select Partner Company...</option>
                    {partners.map((pt) => (
                      <option key={pt.id} value={pt.id}>{pt.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Short Description *</label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Description *</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  ></textarea>
                </div>

                <ImageUploader
                  value={formData.images[0] || ''}
                  onChange={(url) => setFormData({ ...formData, images: [url] })}
                  label="Primary Product Image"
                  folder="products"
                />

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">External Partner URL</label>
                  <input
                    type="url"
                    placeholder="https://partner-website.com/product"
                    value={formData.externalUrl}
                    onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  />
                </div>

                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded border-gray-300 text-brand-earth"
                    />
                    <span>Feature on Homepage Grid</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="rounded border-gray-300 text-brand-earth"
                    />
                    <span>Publish Immediately</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold border text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-brand-dark-green text-white hover:bg-brand-med-green"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
