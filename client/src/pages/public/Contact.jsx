import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import SEOHead from '../../components/public/SEOHead';
import WhatsAppButton from '../../components/public/WhatsAppButton';
import CallButton from '../../components/public/CallButton';
import Disclaimer from '../../components/public/Disclaimer';
import { useToast } from '../../context/ToastContext';
import { useSettings } from '../../context/SettingsContext';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();
  const { settings } = useSettings();

  const phone = settings.phone || '+1 (800) 555-2646';
  const email = settings.email || 'contact@anintawellness.com';
  const address = settings.address || '100 Serenity Boulevard, Suite 400, San Francisco, CA 94107';
  const hours = settings.opening_hours || 'Mon - Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 3:00 PM | Sun: Closed';

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Enquiry submitted successfully! Our practitioners will contact you shortly.', 'success');
  };

  return (
    <>
      <SEOHead title="Contact Us & Enquiries" description="Get in touch with Aninta Therapy Center via direct phone, instant WhatsApp, email, or visit our center." />

      <section className="bg-brand-dark-green text-white py-16 text-center">
        <div className="max-w-content mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-earth mb-3 block">
            We're Here to Support You
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Contact Aninta Therapy Center
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Reach out via instant messaging, direct phone dialers, or send a message to our practitioner team.
          </p>
        </div>
      </section>

      <section className="py-16 bg-brand-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Contact Details Card Column */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-earth/15">
                <h2 className="font-serif text-2xl font-bold text-brand-dark-green mb-6">
                  Direct Inquiries
                </h2>

                <div className="space-y-6 text-sm text-brand-text-dark">
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <strong className="block font-semibold text-brand-dark-green">WhatsApp Instant Chat</strong>
                      <p className="text-xs text-brand-text-muted mb-2">Fastest response for consultation availability.</p>
                      <WhatsAppButton context="contact_page_card" className="px-4 py-2 text-xs">
                        Start WhatsApp Chat ({settings.whatsapp_number})
                      </WhatsAppButton>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-earth/20 text-brand-earth flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-semibold text-brand-dark-green">Phone Call</strong>
                      <p className="text-xs text-brand-text-muted mb-2">{hours}</p>
                      <CallButton context="contact_page_card" className="px-4 py-2 text-xs">
                        {phone}
                      </CallButton>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-light-green text-brand-dark-green flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-semibold text-brand-dark-green">Email</strong>
                      <a href={`mailto:${email}`} className="text-xs text-brand-med-green font-semibold hover:underline">
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-cream text-brand-earth flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-semibold text-brand-dark-green">Center Location</strong>
                      <p className="text-xs text-brand-text-muted leading-relaxed">
                        {address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-brand-text-dark flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-semibold text-brand-dark-green">Opening Hours</strong>
                      <p className="text-xs text-brand-text-muted leading-relaxed">
                        {hours}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* General Enquiry Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-brand-earth/15">
                <h2 className="font-serif text-2xl font-bold text-brand-dark-green mb-2">
                  Send a General Message
                </h2>
                <p className="text-xs sm:text-sm text-brand-text-muted mb-8">
                  Fill out the form below and an Aninta team member will respond within 24 hours.
                </p>

                {submitted ? (
                  <div className="bg-brand-light-green/60 border border-brand-med-green/30 p-8 rounded-2xl text-center">
                    <CheckCircle2 className="w-12 h-12 text-brand-dark-green mx-auto mb-3" />
                    <h3 className="font-serif text-xl font-bold text-brand-dark-green mb-2">Enquiry Received</h3>
                    <p className="text-xs text-brand-text-muted">
                      Thank you for contacting Aninta Therapy Center. We look forward to connecting with you.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-dark mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Doe"
                          className="w-full px-4 py-3 rounded-xl bg-brand-cream/50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-dark mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 rounded-xl bg-brand-cream/50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-dark mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-brand-cream/50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-dark mb-1">
                        Message / Enquiry *
                      </label>
                      <textarea
                        rows="5"
                        required
                        placeholder="How can we assist you with our services or partner products?"
                        className="w-full px-4 py-3 rounded-xl bg-brand-cream/50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-brand-dark-green hover:bg-brand-med-green text-white font-semibold text-sm shadow-md transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Enquiry</span>
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

          <Disclaimer />

        </div>
      </section>
    </>
  );
}
