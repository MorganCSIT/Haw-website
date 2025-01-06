import { useCart } from '../../hooks/useCart';
import AddToCartButton from '../cart/AddToCartButton';
import type { Experience } from '../../types/experiences';

interface ExperienceProductCardProps {
  experience: Experience;
  onSelect: (experience: Experience) => void;
}

export default function ExperienceProductCard({ experience, onSelect }: ExperienceProductCardProps) {
  const { addToCart } = useCart();
  const Icon = experience.icon;

  const handleAddToCart = () => {
    addToCart({
      id: experience.id,
      name: experience.title,
      description: experience.description,
      price: experience.price,
      category: 'vacation'
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="h-48 bg-cover bg-center relative cursor-pointer"
        style={{ backgroundImage: `url(${experience.image})` }}
        onClick={() => onSelect(experience)}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
          <Icon className="h-6 w-6 text-teal-600" />
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 
              className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-teal-600"
              onClick={() => onSelect(experience)}
            >
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
          {experience.activities.length > 3 && (
            <button 
              onClick={() => onSelect(experience)}
              className="text-sm text-teal-600 hover:text-teal-700 mt-2"
            >
              View all activities...
            </button>
          )}
        </div>

        <AddToCartButton onClick={handleAddToCart} />
      </div>
    </div>
  );
}