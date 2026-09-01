import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'green', subtitle }) {
  const colorMap = {
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    earth: 'bg-amber-50 text-amber-900 border-amber-200',
    blue: 'bg-blue-50 text-blue-900 border-blue-200',
    purple: 'bg-purple-50 text-purple-900 border-purple-200'
  };

  return (
    <div className={`p-6 rounded-2xl border bg-white shadow-sm flex items-center justify-between`}>
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted block mb-1">
          {title}
        </span>
        <span className="font-serif text-3xl font-bold text-brand-dark-green">
          {value}
        </span>
        {subtitle && (
          <p className="text-xs text-brand-text-muted mt-1">{subtitle}</p>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorMap[color] || colorMap.green}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
