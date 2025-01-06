import { Heart, Trash2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/format';
import InterestItem from './InterestItem';
import CartModal from '../cart/CartModal';
import { useState } from 'react';

export default function InterestList() {
  const { cart, clearCart } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);

  const handleClearInterests = () => {
    if (window.confirm('Are you sure you want to clear your interest list? This action cannot be undone.')) {
      clearCart();
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Heart className="h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-800">Your Interest List is Empty</h3>
          <p className="text-gray-600">
            Start exploring our services and add items to your interest list.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">My Interests</h2>
            <p className="text-sm text-gray-600 mt-1">
              {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your list
            </p>
          </div>
          <button
            onClick={handleClearInterests}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear List
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {cart.items.map((item) => (
          <InterestItem key={item.id} item={item} />
        ))}
      </div>

      <div className="p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-medium text-gray-800">Total Value</span>
          <span className="text-2xl font-semibold text-gray-800">
            {formatPrice(cart.total)}
          </span>
        </div>
        <button
          onClick={() => setShowCartModal(true)}
          className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Submit Interest List
        </button>
      </div>

      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
      />
    </div>
  );
}