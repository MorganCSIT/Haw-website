import { useState, FormEvent } from 'react';
import { submitPropertyInquiry } from '../../lib/api/property';
import type { PropertyInquiry } from '../../lib/types/inquiries';

export default function InvestmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    purpose: '',
    propertyType: '',
    services: {
      propertyManagement: false,
      legalServices: false,
      rentalManagement: false
    },
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const selectedServices = Object.entries(formData.services)
      .filter(([_, selected]) => selected)
      .map(([service]) => service);

    const inquiryData: PropertyInquiry = {
      name: formData.name,
      email: formData.email,
      details: {
        budget: formData.budget,
        purpose: formData.purpose,
        property_type: formData.propertyType,
        services: selectedServices,
        additional_requirements: formData.message
      }
    };

    const result = await submitPropertyInquiry(inquiryData);

    setStatus(result.success ? 'success' : 'error');
    if (result.success) {
      setFormData({
        name: '',
        email: '',
        budget: '',
        purpose: '',
        propertyType: '',
        services: {
          propertyManagement: false,
          legalServices: false,
          rentalManagement: false
        },
        message: ''
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Start Your Investment Journey</h2>
            <p className="text-xl text-gray-600">
              Tell us about your investment goals, and we'll help you find the perfect property.
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
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                Investment Budget (USD)
              </label>
              <input
                type="number"
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Your budget in USD"
                required
              />
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                Investment Purpose
              </label>
              <select
                id="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Select your primary purpose</option>
                <option value="retirement">Retirement Home</option>
                <option value="rental">Rental Income</option>
                <option value="holiday">Holiday Home</option>
                <option value="resale">Capital Appreciation</option>
              </select>
            </div>

            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Property Type
              </label>
              <select
                id="propertyType"
                value={formData.propertyType}
                onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Select property type</option>
                <option value="condo">Condominium</option>
                <option value="villa">Villa</option>
                <option value="house">House</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Services Required
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.services.propertyManagement}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      services: {
                        ...prev.services,
                        propertyManagement: e.target.checked
                      }
                    }))}
                    className="rounded text-teal-600"
                  />
                  <span className="ml-2">Property Management</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.services.legalServices}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      services: {
                        ...prev.services,
                        legalServices: e.target.checked
                      }
                    }))}
                    className="rounded text-teal-600"
                  />
                  <span className="ml-2">Legal Services</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.services.rentalManagement}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      services: {
                        ...prev.services,
                        rentalManagement: e.target.checked
                      }
                    }))}
                    className="rounded text-teal-600"
                  />
                  <span className="ml-2">Rental Management</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Requirements
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
                {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
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