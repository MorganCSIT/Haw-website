import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthCartModal({ isOpen, onClose }: AuthCartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Sign In Required</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-8">
          You need to be signed in to add items to your interest list. Please sign in to your existing account or create a new one.
        </p>

        <div className="space-y-4">
          <Link 
            to="/login"
            className="w-full inline-block text-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="w-full inline-block text-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}