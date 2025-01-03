import { useState } from 'react';
import { submitContactInquiry } from '../lib/api/contact';
import type { ContactInquiry } from '../lib/types/inquiries';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const inquiryData: ContactInquiry = {
      name: formData.name,
      email: formData.email,
      details: {
        interest: formData.interest,
        message: formData.message
      }
    };

    const result = await submitContactInquiry(inquiryData);

    setStatus(result.success ? 'success' : 'error');
    if (result.success) {
      setFormData({ name: '', email: '', interest: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Start Your Journey Today</h2>
            <p className="text-xl text-gray-600">
              Contact us to discuss how we can help make your Phuket dreams a reality.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                I'm interested in
              </label>
              <select
                id="interest"
                value={formData.interest}
                onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Select your primary interest</option>
                <option value="retirement">Retirement Planning</option>
                <option value="property">Property Investment</option>
                <option value="vacation">Assisted Vacation</option>
                <option value="legal">Legal & Insurance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Tell us about your plans and how we can help..."
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              
              {status === 'success' && (
                <p className="mt-4 text-green-600">Thank you! We'll be in touch soon.</p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-red-600">Something went wrong. Please try again.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}