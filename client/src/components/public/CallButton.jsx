import React from 'react';
import { Phone } from 'lucide-react';
import { Analytics } from '../../utils/analytics';
import { useSettings } from '../../context/SettingsContext';

export default function CallButton({ 
  phone,
  context = 'general',
  children = 'Call Us',
  className = ''
}) {
  const { settings } = useSettings();
  const targetPhone = phone || settings.phone || '+1 (800) 555-2646';
  const telUrl = `tel:${targetPhone.replace(/[^\d+]/g, '')}`;

  const handleClick = () => {
    Analytics.clickPhone(context);
  };

  return (
    <a
      href={telUrl}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-earth focus:ring-offset-2 ${
        className || 'bg-brand-earth hover:bg-amber-700 text-white'
      }`}
    >
      <Phone className="w-4 h-4 shrink-0" />
      <span>{children}</span>
    </a>
  );
}
