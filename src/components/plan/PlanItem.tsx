import { X } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/format";
import type { CartItem } from "../../lib/types/cart";

interface PlanItemProps {
  item: CartItem;
}

export default function PlanItem({ item }: PlanItemProps) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
        <p className="text-teal-600 font-medium mt-1">
          {formatPrice(item.price)}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <select
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="border rounded p-1"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-600 hover:text-red-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
