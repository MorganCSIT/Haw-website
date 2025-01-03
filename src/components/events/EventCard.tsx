import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Event } from '../../data/events';

interface EventCardProps {
  event: Event;
  onSelect: (event: Event) => void;
}

export default function EventCard({ event, onSelect }: EventCardProps) {
  const Icon = event.category;
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/events/${event.id}`}>
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${event.image})` }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
            {typeof event.price === 'number' ? `$${event.price}` : event.price}
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

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {event.spotsLeft} spots left
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                onSelect(event);
              }}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Register Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}