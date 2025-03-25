import { useState } from "react";
import { X } from "lucide-react";
import type { UserProfile } from "../../types/profile";
import PersonalDetailsForm from "../account/PersonalDetailsForm";

interface PersonalDetailsPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: Partial<UserProfile>) => Promise<void>;
}

export default function PersonalDetailsPrompt({
  isOpen,
  onClose,
  onSave,
}: PersonalDetailsPromptProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (profile: Partial<UserProfile>) => {
    setIsSubmitting(true);
    try {
      await onSave(profile);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Complete Your Profile
          </h2>
          {!isSubmitting && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-8">
            Please provide your personal details to help us better assist you
            with your plan.
          </p>

          <PersonalDetailsForm
            profile={null}
            onSave={handleSave}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
