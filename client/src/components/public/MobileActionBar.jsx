import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Package, MessageCircle, Phone } from 'lucide-react';
import { Analytics } from '../../utils/analytics';
import { useSettings } from '../../context/SettingsContext';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

export default function MobileActionBar() {
  const { settings } = useSettings();
  const whatsappNumber = settings.whatsapp_number || '09059916392';
  const whatsappMsg = settings.whatsapp_default_message || 'Hello Aninta Therapy Center. I would like to make an enquiry.';
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, whatsappMsg);
  
  const phone = settings.phone || '+2349059916392';
  const phoneUrl = `tel:${phone.replace(/[^\d+]/g, '')}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-cream/95 backdrop-blur-md border-t border-brand-earth/20 shadow-lg px-2 py-2">
      <div className="grid grid-cols-4 items-center gap-1 max-w-md mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-xs font-medium transition ${
              isActive ? 'text-brand-dark-green font-bold bg-brand-light-green' : 'text-brand-text-muted hover:text-brand-dark-green'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-xs font-medium transition ${
              isActive ? 'text-brand-dark-green font-bold bg-brand-light-green' : 'text-brand-text-muted hover:text-brand-dark-green'
            }`
          }
        >
          <Package className="w-5 h-5 mb-0.5" />
          <span>Products</span>
        </NavLink>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => Analytics.clickWhatsApp('mobile_action_bar')}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-xs font-medium text-emerald-700 hover:bg-emerald-50 transition"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 fill-current" />
          <span>WhatsApp</span>
        </a>

        <a
          href={phoneUrl}
          onClick={() => Analytics.clickPhone('mobile_action_bar')}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-xs font-medium text-brand-earth hover:bg-amber-50 transition"
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}
