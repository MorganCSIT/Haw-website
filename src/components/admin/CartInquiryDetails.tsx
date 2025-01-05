import { X } from 'lucide-react';
import { format } from 'date-fns';
import type { CartInquiry } from '../../types/admin';

interface CartInquiryDetailsProps {
  inquiry: CartInquiry | null;
  onClose: () => void;
}

export default function CartInquiryDetails({ inquiry, onClose }: CartInquiryDetailsProps) {
  if (!inquiry) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
        Select an inquiry to view details
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Cart Inquiry Details</h2>
            <p className="text-gray-600">{inquiry.user_email}</p>
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
        {/* Customer Information */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <p className="text-sm text-gray-900">
                  {inquiry.first_name && inquiry.last_name 
                    ? `${inquiry.first_name} ${inquiry.last_name}`
                    : 'Not provided'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone:</span>
                <p className="text-sm text-gray-900">{inquiry.phone_number || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Nationality:</span>
                <p className="text-sm text-gray-900">{inquiry.nationality || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Languages:</span>
                <p className="text-sm text-gray-900">{inquiry.languages || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Marital Status:</span>
                <p className="text-sm text-gray-900">{inquiry.marital_status || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Date of Birth:</span>
                <p className="text-sm text-gray-900">
                  {inquiry.date_of_birth 
                    ? format(new Date(inquiry.date_of_birth), 'PP')
                    : 'Not provided'}
                </p>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-500">Address:</span>
              <p className="text-sm text-gray-900 mt-1">{inquiry.address || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Emergency Contact:</span>
              <p className="text-sm text-gray-900 mt-1">{inquiry.emergency_contact || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Order Summary</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {inquiry.items?.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} x {item.quantity}
                </span>
                <span className="text-gray-900 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 flex justify-between text-sm">
              <span className="font-medium text-gray-900">Total</span>
              <span className="font-medium text-gray-900">
                ${inquiry.total_amount}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Message */}
        {inquiry.message && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Message</h3>
            <p className="text-gray-600 bg-gray-50 rounded-lg p-4">
              {inquiry.message}
            </p>
          </div>
        )}

        {/* Order Information */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Order Information</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order Date:</span>
              <span className="text-gray-900">
                {format(new Date(inquiry.created_at), 'PPP p')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status:</span>
              <span className="text-gray-900 font-medium">{inquiry.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}