import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/format';
import { submitCartInquiry } from '../../lib/api/cart';

interface CartInquiryFormProps {
  onClose: () => void;
}

export default function CartInquiryForm({ onClose }: CartInquiryFormProps) {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const result = await submitCartInquiry(user.id, cart, message);
      
      if (!result.success) throw new Error('Failed to submit inquiry');
      
      setStatus('success');
      clearCart();
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error('Error sending inquiry:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Cart Summary</h3>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span className="text-gray-600">
                {item.name} x {item.quantity}
              </span>
              <span className="font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>{formatPrice(cart.total)}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Message (Optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Any specific requirements or questions..."
        />
      </div>

      {status === 'success' && (
        <p className="text-green-600 text-center">
          Your inquiry has been sent successfully!
        </p>
      )}

      {status === 'error' && (
        <p className="text-red-600 text-center">
          Failed to send inquiry. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={loading || status === 'success'}
        className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}