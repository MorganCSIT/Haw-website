import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
  onClick: () => void;
}

export default function AddToCartButton({ onClick }: AddToCartButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    
    // Reset animation after completion
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  return (
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
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </>
        )}
      </div>
    </button>
  );
}