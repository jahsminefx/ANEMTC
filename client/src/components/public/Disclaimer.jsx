import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { GLOBAL_HEALTH_DISCLAIMER } from '../../utils/disclaimers';
import { useSettings } from '../../context/SettingsContext';

export default function Disclaimer({ text, variant = 'amber', className = '' }) {
  const { settings } = useSettings();
  const disclaimerText = text || settings.global_disclaimer || GLOBAL_HEALTH_DISCLAIMER;

  const isDark = variant === 'dark';

  return (
    <div 
      className={`rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 border transition ${
        isDark 
          ? 'bg-emerald-950/90 border-emerald-800/80 text-emerald-100' 
          : 'bg-amber-50/90 border-amber-200/80 text-amber-950'
      } ${className}`}
    >
      <ShieldAlert className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-brand-earth' : 'text-amber-700'}`} />
      <div className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-emerald-100/95' : 'text-amber-900'}`}>
        <strong className={`font-semibold block mb-1 ${isDark ? 'text-brand-earth font-serif text-sm font-bold' : 'text-amber-950'}`}>
          Wellness & Educational Disclaimer:
        </strong>
        {disclaimerText}
      </div>
    </div>
  );
}
