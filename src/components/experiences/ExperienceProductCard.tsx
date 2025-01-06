import { useState } from 'react';
import { ListPlus, Check } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/format';
import AuthCartModal from '../auth/AuthCartModal';
import type { Experience } from '../../types/experiences';

interface ExperienceProductCardProps {
  experience: Experience;
}

export default function ExperienceProductCard({ experience }: ExperienceProductCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const Icon = experience.icon;
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsAnimating(true);
    addToCart({
      id: experience.id,
      name: experience.title,
      description: experience.description,
      price: experience.price,
      category: 'vacation'
    });
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };
  
  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${experience.image})` }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
            <Icon className="h-6 w-6 text-teal-600" />
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {experience.title}
              </h3>
              <span className="text-lg font-semibold text-teal-600">${experience.price}</span>
            </div>
            <p className="text-gray-600 mb-4">{experience.description}</p>
            <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full mb-4">
              Mobility Level: {experience.mobilityLevel}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Popular Activities:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {experience.activities.slice(0, 3).map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>

          <div onClick={e => e.stopPropagation()}>
            <button
              onClick={handleAddToCart}
              disabled={isAnimating}
              className={`
                w-full flex items-center justify-center px-4 py-2 rounded-lg
                transition-all duration-300 ease-in-out
                ${isAnimating 
                  ? 'bg-green-600 scale-95' 
                  : 'bg-teal-600 hover:bg-teal-700'
                }
                text-white disabled:opacity-50
              `}
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
          </div>
        </div>
      </div>

      <AuthCartModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        returnUrl="/vacations"
      />
    </>
  );
}