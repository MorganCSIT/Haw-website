import { useState, FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useProfile } from "../../hooks/useProfile";
import { formatPrice } from "../../utils/format";
import { submitCartInquiry } from "../../lib/api/cart/submission";

interface CartInquiryFormProps {
  onClose: () => void;
}

export default function CartInquiryForm({ onClose }: CartInquiryFormProps) {
  const { user } = useAuth();
  const { cart } = useCart();
  const { profile } = useProfile(user?.id);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to submit an inquiry");
      return;
    }

    if (!profile) {
      setError("Please complete your personal details before submitting");
      return;
    }

    if (cart.items.length === 0) {
      setError("Your plan is empty");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await submitCartInquiry(user.id, cart, message);

      if (!result.success) {
        throw new Error(result.error || "Failed to submit inquiry");
      }

      setSuccess(true);

      // Close modal after success message
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error sending inquiry:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Plan Summary</h3>
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
            <span>Total Value</span>
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

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-700">
            Your plan has been submitted successfully!
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || success}
        className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Plan"}
      </button>
    </form>
  );
}
