import { useState, FormEvent } from "react";
import { X } from "lucide-react";
import type { Event } from "../../data/events";

interface EventRegistrationProps {
  event: Event | null;
  onClose: () => void;
}

export default function EventRegistration({
  event,
  onClose,
}: EventRegistrationProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    participants: 1,
    specialRequirements: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      // Handle form submission
      // Simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setTimeout(onClose, 2000); // Close the form after a delay
    } catch (error) {
      setStatus("error");
    }
  };

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Register for Event
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {event.title}
            </h3>
            <p className="text-gray-600">
              {event.date} at {event.time}
            </p>
            <p className="text-gray-600">{event.location}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Participants
              </label>
              <input
                type="number"
                min="1"
                max={event.spotsLeft}
                value={formData.participants}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    participants: parseInt(e.target.value),
                  }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements
              </label>
              <textarea
                value={formData.specialRequirements}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specialRequirements: e.target.value,
                  }))
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? "Submitting..." : "Register"}
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
    </div>
  );
}
