import React, { useState, useEffect } from 'react';
import { Package, Handshake, FileText, Mail, Sparkles, Activity } from 'lucide-react';
import AdminTopBar from '../../components/admin/AdminTopBar';
import StatCard from '../../components/admin/StatCard';
import { useAuth } from '../../context/AuthContext';
import SEOHead from '../../components/public/SEOHead';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetch('/api/admin/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.success) setData(resData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="p-8 text-brand-text-muted">Loading dashboard metrics...</div>;

  const stats = data?.stats || {};
  const recentActivity = data?.recentActivity || [];

  return (
    <>
      <SEOHead title="Admin Dashboard" />
      <AdminTopBar title="Dashboard Overview" />

      <main className="p-6 max-w-content mx-auto space-y-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Total Products" value={stats.totalProducts || 0} icon={Package} color="green" />
          <StatCard title="Featured Products" value={stats.featuredProducts || 0} icon={Sparkles} color="earth" />
          <StatCard title="Partner Companies" value={stats.totalPartners || 0} icon={Handshake} color="blue" />
          <StatCard title="Published Articles" value={stats.publishedArticles || 0} icon={FileText} color="purple" />
          <StatCard title="Subscribers" value={stats.totalSubscribers || 0} icon={Mail} color="green" />
        </div>

        {/* Audit Log Recent Activity Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-brand-earth" />
            <h2 className="font-serif text-xl font-bold text-brand-dark-green">
              Recent Admin Activity
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Admin</th>
                  <th className="py-3 px-4">Target Type</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentActivity.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-400">No activity recorded yet.</td>
                  </tr>
                ) : (
                  recentActivity.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/60">
                      <td className="py-3 px-4 font-semibold text-brand-dark-green">{log.action}</td>
                      <td className="py-3 px-4 text-gray-600">{log.admin?.name || 'System'}</td>
                      <td className="py-3 px-4 text-gray-600">{log.targetType}</td>
                      <td className="py-3 px-4 text-gray-400">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </>
  );
}
