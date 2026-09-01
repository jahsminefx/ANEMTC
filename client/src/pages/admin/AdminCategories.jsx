import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import AdminTopBar from '../../components/admin/AdminTopBar';
import ImageUploader from '../../components/admin/ImageUploader';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/public/SEOHead';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: ''
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setCategories(data.data || []);
    } catch (err) {
      console.error(err);
      addToast('Failed to load categories.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  const handleOpenNew = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', image: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : '/api/admin/categories';
      const method = editingCategory ? 'PUT' : 'POST';

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
        throw new Error(data.error || 'Failed to save category');
      }

      addToast(`Category ${editingCategory ? 'updated' : 'created'}!`, 'success');
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      addToast(err.message || 'Error saving category.', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        addToast('Category deleted.', 'info');
        fetchCategories();
      }
    } catch (err) {
      addToast('Failed to delete category.', 'error');
    }
  };

  return (
    <>
      <SEOHead title="Manage Categories - Admin" />
      <AdminTopBar title="Wellness Categories Management" />

      <main className="p-6 max-w-content mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-brand-text-muted">Manage health-compliant wellness categories.</p>
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-dark-green hover:bg-brand-med-green text-white text-sm font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-semibold text-brand-dark-green">{c.name}</td>
                  <td className="py-3 px-4 text-gray-500 font-mono text-xs">{c.slug}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{c.description || '-'}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => handleOpenEdit(c)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(c.id, c.name)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-serif text-xl font-bold text-brand-dark-green">
                  {editingCategory ? 'Edit Category' : 'New Wellness Category'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  ></textarea>
                </div>

                <ImageUploader
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Category Cover Image"
                  folder="categories"
                />

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border text-sm font-semibold">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 rounded-xl bg-brand-dark-green text-white text-sm font-semibold">Save Category</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
