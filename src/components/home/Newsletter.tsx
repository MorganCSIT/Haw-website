import { useState } from 'react';
import { submitNewsletterSubscription } from '../../lib/api/newsletter';
import type { NewsletterSubscription } from '../../lib/types/inquiries';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const subscriptionData: NewsletterSubscription = {
      name: 'Newsletter Subscriber',
      email,
      details: {
        subscription_type: 'general'
      }
    };

    const result = await submitNewsletterSubscription(subscriptionData);

    setStatus(result.success ? 'success' : 'error');
    if (result.success) {
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-teal-600">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-white/90 mb-8">
            Get exclusive insights about Phuket living, investment opportunities, and lifestyle tips
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {status === 'success' && (
            <p className="text-sm text-white mt-4">
              Thank you for subscribing! You'll receive our next update soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-white/90 mt-4">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="text-sm text-white/80 mt-4">
            Join 5,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}