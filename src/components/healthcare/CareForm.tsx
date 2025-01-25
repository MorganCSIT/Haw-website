import { useState, FormEvent } from "react";
import { submitHealthcareInquiry } from "../../lib/api/healthcare";
import type { HealthcareInquiry } from "../../lib/types/inquiries";

export default function CareForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    carePackage: "",
    mobilityLevel: "",
    medicalConditions: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const inquiryData: HealthcareInquiry = {
      name: formData.name,
      email: formData.email,
      details: {
        care_package: formData.carePackage,
        mobility_level: formData.mobilityLevel,
        medical_conditions: formData.medicalConditions
          ? [formData.medicalConditions]
          : undefined,
        care_timeline: formData.timeline,
        additional_requirements: formData.message,
      },
    };

    const result = await submitHealthcareInquiry(inquiryData);

    setStatus(result.success ? "success" : "error");
    if (result.success) {
      setFormData({
        name: "",
        email: "",
        carePackage: "",
        mobilityLevel: "",
        medicalConditions: "",
        timeline: "",
        message: "",
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Request Care Consultation
            </h2>
            <p className="text-xl text-gray-600">
              Tell us about your care needs, and we'll help create the perfect
              support plan.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="carePackage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Interested Package
              </label>
              <select
                id="carePackage"
                value={formData.carePackage}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    carePackage: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select a care package</option>
                <option value="basic">Basic Support Package</option>
                <option value="medical">Medical Care Package</option>
                <option value="fulltime">24/7 Comprehensive Care</option>
                <option value="specialized">Specialized Care Package</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="mobilityLevel"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mobility Level
              </label>
              <select
                id="mobilityLevel"
                value={formData.mobilityLevel}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    mobilityLevel: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select mobility level</option>
                <option value="independent">Fully Independent</option>
                <option value="minimal">Minimal Assistance Needed</option>
                <option value="moderate">Moderate Assistance Needed</option>
                <option value="full">Full Assistance Required</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="timeline"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                When do you need care?
              </label>
              <select
                id="timeline"
                value={formData.timeline}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, timeline: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select timeline</option>
                <option value="immediate">Immediately</option>
                <option value="month">Within a month</option>
                <option value="threemonths">Within 3 months</option>
                <option value="planning">Future planning</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="medicalConditions"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Medical Conditions (if any)
              </label>
              <input
                type="text"
                id="medicalConditions"
                value={formData.medicalConditions}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    medicalConditions: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="List any relevant medical conditions"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Additional Information
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Please tell us about any specific care requirements or questions..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {status === "submitting"
                  ? "Submitting..."
                  : "Request Consultation"}
              </button>

              {status === "success" && (
                <p className="mt-4 text-green-600">
                  Thank you! We'll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
