import React, { useState, useEffect } from 'react';
import { Download, Search, Mail, CheckCircle2 } from 'lucide-react';
import AdminTopBar from '../../components/admin/AdminTopBar';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/public/SEOHead';

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { addToast } = useToast();

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/subscribers', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setSubscribers(data.data || []);
    } catch (err) {
      console.error(err);
      addToast('Failed to load newsletter subscribers.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [token]);

  const handleExportCSV = () => {
    window.open(`/api/admin/subscribers/export?token=${token}`, '_blank');
    addToast('Exporting CSV subscriber database...', 'info');
  };

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.firstName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEOHead title="Newsletter Subscribers - Admin" />
      <AdminTopBar title="Newsletter Subscribers" />

      <main className="p-6 max-w-content mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search subscribers by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-earth bg-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-earth hover:bg-amber-700 text-white text-sm font-semibold shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Database</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Subscriber Email</th>
                <th className="py-3 px-4">First Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Brevo Synced</th>
                <th className="py-3 px-4 text-right">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-semibold text-brand-dark-green">{sub.email}</td>
                  <td className="py-3 px-4 text-gray-600">{sub.firstName || '-'}</td>
                  <td className="py-3 px-4">
                    {sub.status === 'ACTIVE' ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium text-xs">Active</span>
                    ) : (
                      <span className="text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium text-xs">Unsubscribed</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {sub.brevoSynced ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Synced
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-400 text-xs">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
