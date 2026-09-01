import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Shield } from 'lucide-react';

export default function AdminTopBar({ title }) {
  const { admin } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      <h1 className="font-serif text-2xl font-bold text-brand-dark-green">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-brand-light-green border border-brand-med-green/20 text-xs font-semibold text-brand-dark-green">
          <Shield className="w-3.5 h-3.5 text-brand-earth" />
          <span>{admin?.role || 'SUPERADMIN'} SESSION</span>
        </div>
      </div>
    </header>
  );
}
