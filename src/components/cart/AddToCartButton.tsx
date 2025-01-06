import { useState } from 'react';
import { ListPlus, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AuthCartModal from '../auth/AuthCartModal';

interface AddToCartButtonProps {
  onClick: () => void;
}

export default function AddToCartButton({ onClick }: AddToCartButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsAnimating(true);
    onClick();
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isAnimating}
        className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 ${
          isAnimating 
            ? 'bg-green-600 scale-95' 
            : 'bg-teal-600 hover:bg-teal-700'
        } text-white`}
      >
        <div className="flex items-center space-x-2">
          {isAnimating ? (
            <>
              <Check className="h-5 w-5" />
              <span>Added to Interests</span>
            </>
          ) : (
            <>
              <ListPlus className="h-5 w-5" />
              <span>Add to Interests</span>
            </>
          )}
        </div>
      </button>

      <AuthCartModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}