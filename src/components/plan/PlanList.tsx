import { useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import PlanItem from "./PlanItem";
import CartModal from "../cart/CartModal";

export default function PlanList() {
  const { cart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handleClearPlan = () => {
    if (
      window.confirm(
        "Are you sure you want to clear your plan? This action cannot be undone."
      )
    ) {
      clearCart();
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800">
          Your Plan is Empty
        </h3>
        <p className="text-gray-600">
          Start exploring our services and add items to your plan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">My Plan</h2>
          <p className="text-sm text-gray-600 mt-1">
            Review and submit your selected items
          </p>
        </div>
        <button
          onClick={handleClearPlan}
          className="flex items-center text-red-600 hover:text-red-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <PlanItem key={item.id} item={item} />
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
      >
        Submit Plan
      </button>

      <CartModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
