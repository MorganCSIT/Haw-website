import { X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/format';
import type { CartItem } from '../../lib/types/cart';

interface InterestItemProps {
  item: CartItem;
}

export default function InterestItem({ item }: InterestItemProps) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="p-6 flex items-start justify-between hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <span className="font-medium text-gray-800">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        <div className="flex items-center mt-4">
          <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-600 mr-2">
            Quantity:
          </label>
          <select
            id={`quantity-${item.id}`}
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            className="border rounded p-1 text-sm"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500 ml-4">
            {formatPrice(item.price)} each
          </span>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="ml-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
        title="Remove item"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}