import { Calendar, MapPin } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/format';
import AddToCartButton from '../cart/AddToCartButton';
import { categoryIcons } from '../../data/events';
import type { Event } from '../../types/events';

interface EventProductCardProps {
  event: Event;
}

export default function EventProductCard({ event }: EventProductCardProps) {
  const { addToCart } = useCart();
  const CategoryIcon = categoryIcons[event.category];

  const handleAddToCart = () => {
    addToCart({
      id: event.id,
      name: event.title,
      description: `${event.date} at ${event.time} - ${event.location}`,
      price: typeof event.price === 'number' ? event.price : 0,
      category: 'event'
    });
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
          {typeof event.price === 'number' ? formatPrice(event.price) : event.price}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {event.date} at {event.time}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CategoryIcon className="h-4 w-4 mr-2 text-teal-600" />
            <span className="text-sm text-gray-600 capitalize">{event.category}</span>
          </div>
          <span className="text-sm text-gray-500">
            {event.spotsLeft} spots left
          </span>
        </div>

        <AddToCartButton onClick={handleAddToCart} />
      </div>
    </div>
  );
}