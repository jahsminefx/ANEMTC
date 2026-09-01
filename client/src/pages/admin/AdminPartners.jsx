import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, ExternalLink } from 'lucide-react';
import AdminTopBar from '../../components/admin/AdminTopBar';
import ImageUploader from '../../components/admin/ImageUploader';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/public/SEOHead';

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    description: '',
    websiteUrl: '',
    registrationUrl: '',
    productUrl: '',
    isFeatured: false,
    isPublished: true
  });

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/partners', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setPartners(data.data || []);
    } catch (err) {
      console.error(err);
      addToast('Failed to load partners.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [token]);

  const handleOpenNew = () => {
    setEditingPartner(null);
    setFormData({
      name: '',
      slug: '',
      logo: '',
      description: '',
      websiteUrl: '',
      registrationUrl: '',
      productUrl: '',
      isFeatured: false,
      isPublished: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      slug: partner.slug,
      logo: partner.logo || '',
      description: partner.description,
      websiteUrl: partner.websiteUrl,
      registrationUrl: partner.registrationUrl || '',
      productUrl: partner.productUrl || '',
      isFeatured: partner.isFeatured,
      isPublished: partner.isPublished
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPartner ? `/api/admin/partners/${editingPartner.id}` : '/api/admin/partners';
      const method = editingPartner ? 'PUT' : 'POST';

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
        throw new Error(data.error || 'Failed to save partner record');
      }

      addToast(`Partner ${editingPartner ? 'updated' : 'created'} successfully!`, 'success');
      setIsModalOpen(false);
      fetchPartners();
    } catch (err) {
      addToast(err.message || 'Error saving partner.', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete partner "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        addToast('Partner deleted.', 'info');
        fetchPartners();
      }
    } catch (err) {
      addToast('Failed to delete partner.', 'error');
    }
  };

  return (
    <>
      <SEOHead title="Manage Partners - Admin" />
      <AdminTopBar title="Partner Company Management" />

      <main className="p-6 max-w-content mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-brand-text-muted">Manage affiliated brands (e.g. DLT, Newcam) and external links.</p>
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-dark-green hover:bg-brand-med-green text-white text-sm font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Partner Company</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Partner</th>
                <th className="py-3 px-4">Website URL</th>
                <th className="py-3 px-4">Products</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-semibold text-brand-dark-green flex items-center gap-3">
                    {p.logo && <img src={p.logo} alt="" className="w-8 h-8 rounded-lg object-cover" />}
                    <span>{p.name}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    <a href={p.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-brand-med-green hover:underline inline-flex items-center gap-1">
                      <span>{p.websiteUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{p._count?.products || 0} items</td>
                  <td className="py-3 px-4">
                    {p.isPublished ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium text-xs">Active</span>
                    ) : (
                      <span className="text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium text-xs">Hidden</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => handleOpenEdit(p)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id, p.name)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition">
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
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-serif text-2xl font-bold text-brand-dark-green">
                  {editingPartner ? 'Edit Partner Company' : 'New Partner Company'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  />
                </div>

                <ImageUploader
                  value={formData.logo}
                  onChange={(url) => setFormData({ ...formData, logo: url })}
                  label="Company Logo"
                  folder="partners"
                />

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Description *</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Official Website URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://partnerbrand.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border text-sm font-semibold">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 rounded-xl bg-brand-dark-green text-white text-sm font-semibold">Save Partner</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
