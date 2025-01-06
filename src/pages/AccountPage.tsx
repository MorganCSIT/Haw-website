import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useProfile } from '../hooks/useProfile';
import { formatPrice } from '../utils/format';
import PersonalDetailsModal from '../components/account/PersonalDetailsModal';
import CartModal from '../components/cart/CartModal';

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { profile, updateProfile } = useProfile(user?.id);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Account Info */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800">My Account</h1>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Sign Out
                </button>
              </div>
              <button
                onClick={() => setShowDetailsModal(true)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                {profile ? 'View Personal Details' : 'Add Personal Details'}
              </button>
            </div>

            {/* Shopping Cart */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
                {cart.items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
              
              {cart.items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-6">
                  {/* Cart Items */}
                  <div className="divide-y divide-gray-200">
                    {cart.items.map((item) => (
                      <div key={item.id} className="py-4 flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <select
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
                          <span className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-medium text-gray-800">Total</span>
                      <span className="text-2xl font-semibold text-gray-800">
                        {formatPrice(cart.total)}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowCartModal(true)}
                      disabled={cart.items.length === 0}
                      className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                      Send Cart Inquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PersonalDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        profile={profile}
        onSave={updateProfile}
      />

      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
      />
    </div>
  );
}