import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/public/SEOHead';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      addToast('Welcome back, Admin!', 'success');
      navigate('/admin');
    } catch (err) {
      addToast(err.message || 'Login failed. Invalid credentials.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead title="Staff Admin Login" />

      <div className="min-h-screen bg-brand-dark-green flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl max-w-md w-full border border-brand-earth/20">
          
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-brand-earth/20 text-brand-dark-green flex items-center justify-center mx-auto mb-4 border border-brand-earth/30">
              <Sparkles className="w-7 h-7 text-brand-earth fill-current" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-brand-dark-green">
              Staff Portal Login
            </h1>
            <p className="text-xs text-brand-text-muted mt-1">
              Authorized Aninta therapy center managers & staff
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-dark mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@aninta.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-cream/50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth"
                />
                <Mail className="w-4 h-4 text-brand-text-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-dark mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-cream/50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth"
                />
                <Lock className="w-4 h-4 text-brand-text-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-brand-dark-green hover:bg-brand-med-green text-white font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-earth disabled:opacity-50 mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Admin CMS</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-brand-text-muted">
            <p>Protected by rate-limiting and audit logging.</p>
          </div>

        </div>
      </div>
    </>
  );
}
