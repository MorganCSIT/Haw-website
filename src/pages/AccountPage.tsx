import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import PersonalDetailsModal from '../components/account/PersonalDetailsModal';
import CartModal from '../components/cart/CartModal';
import InterestList from '../components/interests/InterestList';

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const { profile, updateProfile } = useProfile(user?.id);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  // Show cart modal automatically when navigating from selection flow
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('showModal') === 'true') {
      setShowCartModal(true);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

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

            {/* Interest List */}
            <InterestList />
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