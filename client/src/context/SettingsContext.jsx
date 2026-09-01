import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    site_name: 'Aninta Natural & Energy Medicine Therapy Center',
    tagline: 'Natural Wellness. Energy Therapy. Better Living.',
    phone: '+1 (800) 555-2646',
    whatsapp_number: '15552646000',
    whatsapp_default_message: 'Hello Aninta Therapy Center. I would like to make an enquiry about your energy therapy services and products.',
    email: 'contact@anintawellness.com',
    address: '100 Serenity Boulevard, Suite 400, San Francisco, CA 94107',
    opening_hours: 'Mon - Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 3:00 PM | Sun: Closed',
    facebook_url: 'https://facebook.com/anintawellness',
    instagram_url: 'https://instagram.com/anintawellness',
    tiktok_url: 'https://tiktok.com/@anintawellness',
    global_disclaimer: 'Information provided on this platform is for general educational purposes and is not a substitute for professional medical diagnosis or treatment. Always consult your physician before starting any wellness program.'
  });

  const refreshSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(prev => ({ ...prev, ...data.data }));
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
