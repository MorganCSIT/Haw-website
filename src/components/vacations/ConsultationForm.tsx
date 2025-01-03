import { useState, FormEvent } from 'react';
import { submitVacationInquiry } from '../../lib/api/vacations';
import type { VacationInquiry } from '../../lib/types/inquiries';

interface ConsultationFormProps {
  selectedExperience: string;
}

export default function ConsultationForm({ selectedExperience }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: selectedExperience,
    dates: '',
    mobility: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const inquiryData: VacationInquiry = {
      name: formData.name,
      email: formData.email,
      details: {
        preferred_experience: formData.experience,
        preferred_dates: formData.dates,
        mobility_requirements: formData.mobility,
        additional_requirements: formData.message
      }
    };

    const result = await submitVacationInquiry(inquiryData);

    setStatus(result.success ? 'success' : 'error');
    if (result.success) {
      setFormData({
        name: '',
        email: '',
        experience: selectedExperience,
        dates: '',
        mobility: '',
        message: ''
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Book Your Consultation</h2>
            <p className="text-xl text-gray-600">
              Let's plan your perfect Phuket experience together.
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
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Experience
              </label>
              <input
                type="text"
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Select an experience above or type your preference"
                required
              />
            </div>

            <div>
              <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Dates
              </label>
              <input
                type="text"
                id="dates"
                value={formData.dates}
                onChange={(e) => setFormData(prev => ({ ...prev, dates: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="When would you like to visit?"
                required
              />
            </div>

            <div>
              <label htmlFor="mobility" className="block text-sm font-medium text-gray-700 mb-2">
                Mobility Requirements
              </label>
              <select
                id="mobility"
                value={formData.mobility}
                onChange={(e) => setFormData(prev => ({ ...prev, mobility: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Select your mobility level</option>
                <option value="active">Active - Comfortable with extended walking/activities</option>
                <option value="moderate">Moderate - Some assistance may be needed</option>
                <option value="limited">Limited - Regular assistance required</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Tell us about any specific requirements, interests, or questions..."
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? 'Submitting...' : 'Schedule Consultation'}
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