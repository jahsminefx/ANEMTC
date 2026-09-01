import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Analytics } from '../../utils/analytics';
import { useSettings } from '../../context/SettingsContext';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

export default function WhatsAppButton({ 
  number, 
  message,
  context = 'general',
  productName = null,
  children = 'WhatsApp Us',
  className = ''
}) {
  const { settings } = useSettings();

  const targetNumber = number || settings.whatsapp_number || '09059916392';
  const targetMessage = message || settings.whatsapp_default_message || 'Hello Aninta Therapy Center. I would like to make an enquiry about your services and products.';

  const finalMessage = productName 
    ? `Hello Aninta Therapy Center. I am inquiring about the product: ${productName}`
    : targetMessage;

  const whatsappUrl = buildWhatsAppUrl(targetNumber, finalMessage);

  const handleClick = () => {
    Analytics.clickWhatsApp(context, productName);
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
        className || 'bg-emerald-700 hover:bg-emerald-800 text-white'
      }`}
    >
      <MessageCircle className="w-5 h-5 shrink-0 fill-current" />
      <span>{children}</span>
    </a>
  );
}
