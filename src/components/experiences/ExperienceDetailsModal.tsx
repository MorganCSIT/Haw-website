import { X } from 'lucide-react';
import { formatPrice } from '../../utils/format';
import AddToCartButton from '../cart/AddToCartButton';
import { useCart } from '../../hooks/useCart';
import type { Experience } from '../../types/experiences';

interface ExperienceDetailsModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export default function ExperienceDetailsModal({ experience, onClose }: ExperienceDetailsModalProps) {
  const { addToCart } = useCart();

  if (!experience) return null;

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
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <div 
            className="h-48 md:h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${experience.image})` }}
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{experience.title}</h2>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-2xl font-semibold text-teal-600">
                  {formatPrice(experience.price)}
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">
                  {experience.mobilityLevel} Level
                </span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <p>{experience.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Included Activities</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {experience.activities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-3" />
                  <span className="text-gray-600">{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">What to Expect</h3>
            <div className="space-y-4 text-gray-600">
              <p>Our experienced guides will ensure your comfort and safety throughout the experience. All necessary equipment and transportation are included.</p>
              <p>This experience is suitable for guests with {experience.mobilityLevel.toLowerCase()} mobility levels. Please let us know about any specific requirements when booking.</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-full md:w-auto">
              <AddToCartButton onClick={handleAddToCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}