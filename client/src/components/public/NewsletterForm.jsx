import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Analytics } from '../../utils/analytics';

const newsletterSchema = z.object({
  firstName: z.string().min(1, 'First name is required.').max(100),
  email: z.string().email('Please enter a valid email address.').max(255),
  consent: z.boolean().refine(val => val === true, 'You must agree to receive wellness emails.'),
  honeypot: z.string().optional()
});

export default function NewsletterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      firstName: '',
      email: '',
      consent: false,
      honeypot: ''
    }
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        if (res.status === 409) {
          addToast('This email is already subscribed to our newsletter.', 'info');
        } else {
          addToast(result.error || 'Failed to subscribe. Please try again.', 'error');
        }
        return;
      }

      setSuccess(true);
      addToast(result.message || 'Thank you for subscribing!', 'success');
      Analytics.subscribeNewsletter('homepage');
      reset();
    } catch (err) {
      console.error('Newsletter error:', err);
      addToast('Network error. Please try again later.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-brand-dark-green text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl my-12 relative overflow-hidden shadow-2xl">
      {/* Background Accent Graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-earth/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-med-green/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w- article mx-auto relative z-10 text-center">
        <div className="w-12 h-12 rounded-full bg-brand-earth/20 text-brand-earth flex items-center justify-center mx-auto mb-4 border border-brand-earth/30">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
          Get Wellness Tips in Your Inbox
        </h2>

        <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto mb-8 leading-relaxed">
          Join our newsletter community for evidence-informed health articles, energy therapy insights, and featured partner product spotlights.
        </p>

        {success ? (
          <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-2xl p-6 max-w-md mx-auto flex flex-col items-center text-center">
            <CheckCircle2 className="w-10 h-10 text-brand-earth mb-2" />
            <h3 className="font-serif text-xl font-bold text-white mb-1">Subscription Confirmed!</h3>
            <p className="text-xs text-emerald-200">
              Thank you for subscribing. We respect your privacy and will never share your email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto flex flex-col gap-4 text-left">
            
            {/* Anti-Spam Honeypot Field (Hidden from real users) */}
            <div className="hidden" aria-hidden="true">
              <input type="text" tabIndex="-1" autoComplete="off" {...register('honeypot')} />
            </div>

            {/* First Name Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-1">
                First Name *
              </label>
              <input
                type="text"
                placeholder="Your first name"
                {...register('firstName')}
                className="w-full px-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-brand-earth text-sm"
              />
              {errors.firstName && (
                <p className="text-xs text-red-300 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Email Address Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                className="w-full px-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-brand-earth text-sm"
              />
              {errors.email && (
                <p className="text-xs text-red-300 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="newsletter-consent"
                {...register('consent')}
                className="mt-1 rounded border-emerald-800 bg-emerald-950 text-brand-earth focus:ring-brand-earth"
              />
              <label htmlFor="newsletter-consent" className="text-xs text-emerald-100/80 leading-normal">
                I agree to receive natural wellness guides and product news from Aninta. You can unsubscribe at any time.
              </label>
            </div>
            {errors.consent && (
              <p className="text-xs text-red-300 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.consent.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full py-3.5 px-6 rounded-xl bg-brand-earth hover:bg-amber-600 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <span>Subscribe to Newsletter</span>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
