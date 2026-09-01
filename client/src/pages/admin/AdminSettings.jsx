import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import AdminTopBar from '../../components/admin/AdminTopBar';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useSettings } from '../../context/SettingsContext';
import SEOHead from '../../components/public/SEOHead';

export default function AdminSettings() {
  const [settings, setSettingsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { token } = useAuth();
  const { addToast } = useToast();
  const { refreshSettings } = useSettings();

  useEffect(() => {
    fetch('/api/admin/settings', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const map = {};
          (data.data || []).forEach(s => {
            map[s.key] = s.value;
          });
          setSettingsData(map);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (key, value) => {
    setSettingsData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ settings })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save settings');
      }

      await refreshSettings();
      addToast('Site settings updated & synchronized sitewide!', 'success');
    } catch (err) {
      addToast(err.message || 'Error saving settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-brand-text-muted">Loading settings...</div>;

  return (
    <>
      <SEOHead title="Site Settings - Admin" />
      <AdminTopBar title="Platform & Contact Settings" />

      <main className="p-6 max-w-content mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 space-y-8">
          
          {/* Identity */}
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-dark-green mb-4 pb-2 border-b">
              Center Identity & Tagline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Public Site Name</label>
                <input
                  type="text"
                  value={settings.site_name || ''}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Hero Tagline</label>
                <input
                  type="text"
                  value={settings.tagline || ''}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-dark-green mb-4 pb-2 border-b">
              Phone & Instant WhatsApp Dialers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Phone Number (tel: format)</label>
                <input
                  type="text"
                  value={settings.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">WhatsApp International Number (wa.me)</label>
                <input
                  type="text"
                  placeholder="09059916392"
                  value={settings.whatsapp_number || ''}
                  onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">WhatsApp Default Prefilled Greeting</label>
                <input
                  type="text"
                  value={settings.whatsapp_default_message || ''}
                  onChange={(e) => handleChange('whatsapp_default_message', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                />
              </div>
            </div>
          </div>

          {/* Location & Social */}
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-dark-green mb-4 pb-2 border-b">
              Address & Social Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Opening Hours</label>
                <input
                  type="text"
                  value={settings.opening_hours || ''}
                  onChange={(e) => handleChange('opening_hours', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Physical Address</label>
                <input
                  type="text"
                  value={settings.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
                />
              </div>
            </div>
          </div>

          {/* Global Disclaimer */}
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-dark-green mb-4 pb-2 border-b">
              Global Health Disclaimer Notice
            </h3>
            <textarea
              rows="3"
              value={settings.global_disclaimer || ''}
              onChange={(e) => handleChange('global_disclaimer', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth"
            ></textarea>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-dark-green hover:bg-brand-med-green text-white font-semibold text-sm shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Settings...' : 'Save All Settings'}</span>
            </button>
          </div>

        </form>
      </main>
    </>
  );
}
