import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnUrl?: string;
}

export default function AuthCartModal({
  isOpen,
  onClose,
  returnUrl = "/selection",
}: AuthCartModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Sign In Required
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-8">
            You need to be signed in to add items to your plan. Please sign in
            to your existing account or create a new one.
          </p>

          <div className="space-y-4">
            <Link
              to={`/login?returnUrl=${encodeURIComponent(returnUrl)}`}
              className="w-full inline-block text-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to={`/signup?returnUrl=${encodeURIComponent(returnUrl)}`}
              className="w-full inline-block text-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
