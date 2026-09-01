import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import AdminTopBar from '../../components/admin/AdminTopBar';
import ImageUploader from '../../components/admin/ImageUploader';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/public/SEOHead';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    image: '',
    isPublished: true,
    sortOrder: 0
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setServices(data.data || []);
    } catch (err) {
      console.error(err);
      addToast('Failed to load services.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [token]);

  const handleOpenNew = () => {
    setEditingService(null);
    setFormData({
      name: '',
      slug: '',
      shortDescription: '',
      description: '',
      image: '',
      isPublished: true,
      sortOrder: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (serv) => {
    setEditingService(serv);
    setFormData({
      name: serv.name,
      slug: serv.slug,
      shortDescription: serv.shortDescription,
      description: serv.description,
      image: serv.image || '',
      isPublished: serv.isPublished,
      sortOrder: serv.sortOrder || 0
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingService ? `/api/admin/services/${editingService.id}` : '/api/admin/services';
      const method = editingService ? 'PUT' : 'POST';

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
        throw new Error(data.error || 'Failed to save service');
      }

      addToast(`Service ${editingService ? 'updated' : 'created'} successfully!`, 'success');
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      addToast(err.message || 'Error saving service.', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete service "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        addToast('Service deleted.', 'info');
        fetchServices();
      }
    } catch (err) {
      addToast('Failed to delete service.', 'error');
    }
  };

  return (
    <>
      <SEOHead title="Manage Services - Admin" />
      <AdminTopBar title="Practitioner Services Management" />

      <main className="p-6 max-w-content mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-brand-text-muted">Manage energy therapy offerings and practitioner consultations.</p>
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-dark-green hover:bg-brand-med-green text-white text-sm font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Service Name</th>
                <th className="py-3 px-4">Short Description</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-semibold text-brand-dark-green">{s.name}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{s.shortDescription}</td>
                  <td className="py-3 px-4">
                    {s.isPublished ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium text-xs">Published</span>
                    ) : (
                      <span className="text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium text-xs">Draft</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => handleOpenEdit(s)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(s.id, s.name)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition">
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
                  {editingService ? 'Edit Service' : 'New Service Record'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  />
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
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Overview & Process *</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                  ></textarea>
                </div>

                <ImageUploader
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Featured Service Image"
                  folder="services"
                />

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border text-sm font-semibold">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 rounded-xl bg-brand-dark-green text-white text-sm font-semibold">Save Service</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
