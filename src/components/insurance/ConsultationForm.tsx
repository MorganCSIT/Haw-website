import { useState, FormEvent } from 'react';
import { submitInsuranceInquiry } from '../../lib/api/insurance';
import type { InsuranceInquiry } from '../../lib/types/inquiries';

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    insuranceType: '',
    coverage: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const inquiryData: InsuranceInquiry = {
      name: formData.name,
      email: formData.email,
      details: {
        insurance_type: formData.insuranceType,
        coverage_level: formData.coverage,
        additional_requirements: formData.message
      }
    };

    const result = await submitInsuranceInquiry(inquiryData);

    setStatus(result.success ? 'success' : 'error');
    if (result.success) {
      setFormData({
        name: '',
        email: '',
        insuranceType: '',
        coverage: '',
        message: ''
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get Expert Advice</h2>
            <p className="text-xl text-gray-600">
              Speak with our insurance specialists to find the perfect coverage for your needs
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
              <label htmlFor="insuranceType" className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Type Needed
              </label>
              <select
                id="insuranceType"
                value={formData.insuranceType}
                onChange={(e) => setFormData(prev => ({ ...prev, insuranceType: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Select insurance type</option>
                <option value="health">Health Insurance</option>
                <option value="accident">Accident Coverage</option>
                <option value="retirement">Retirement Insurance</option>
                <option value="comprehensive">Comprehensive Coverage</option>
              </select>
            </div>

            <div>
              <label htmlFor="coverage" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Coverage Level
              </label>
              <select
                id="coverage"
                value={formData.coverage}
                onChange={(e) => setFormData(prev => ({ ...prev, coverage: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Select coverage level</option>
                <option value="basic">Basic Coverage</option>
                <option value="standard">Standard Coverage</option>
                <option value="premium">Premium Coverage</option>
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
                placeholder="Tell us about any specific requirements or questions..."
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? 'Submitting...' : 'Request Consultation'}
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