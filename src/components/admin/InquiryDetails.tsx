import { X } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect, useCallback } from "react";
import type { AdminInquiry } from "../../types/admin";
import EmailResponse from "./EmailResponse";

interface InquiryDetailsProps {
  inquiry: AdminInquiry | null;
  onClose: () => void;
  onNotesUpdate: (id: string, notes: string) => Promise<void>;
}

export default function InquiryDetails({
  inquiry,
  onClose,
  onNotesUpdate,
}: InquiryDetailsProps) {
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setNotes(inquiry?.notes || "");
  }, [inquiry?.id, inquiry?.notes]);

  const handleNotesChange = useCallback(async () => {
    if (!inquiry) return;

    setIsSaving(true);
    try {
      await onNotesUpdate(inquiry.id, notes);
    } finally {
      setIsSaving(false);
    }
  }, [inquiry, notes, onNotesUpdate]);

  if (!inquiry) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
        Select an inquiry to view details
      </div>
    );
  }

  const getInquiryDetails = () => {
    const details = inquiry[`${inquiry.category}_inquiries`]?.[0] || {};
    return Object.entries(details).filter(
      ([key]) => !["id", "inquiry_id", "created_at"].includes(key)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {inquiry.name}
            </h2>
            <p className="text-gray-600">{inquiry.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Inquiry Details
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Category:</span>
              <span className="text-gray-900 font-medium">
                {inquiry.category}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date:</span>
              <span className="text-gray-900">
                {format(new Date(inquiry.created_at), "PPP p")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status:</span>
              <span className="text-gray-900 font-medium">
                {inquiry.status}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Additional Information
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {getInquiryDetails().map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-500">
                  {key
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  :
                </span>
                <span className="text-gray-900">
                  {Array.isArray(value) ? value.join(", ") : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
          <div className="relative">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Add notes about this inquiry..."
            />
            {isSaving && (
              <span className="absolute right-2 bottom-2 text-sm text-gray-500">
                Saving...
              </span>
            )}
          </div>
        </div>

        <div className="pt-4">
          <EmailResponse
            email={inquiry.email}
            subject={`Re: ${inquiry.category} Inquiry`}
          />
        </div>
      </div>
    </div>
  );
}
