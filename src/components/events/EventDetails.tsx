import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, MapPin, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { events } from '../../data/events';
import EventRegistration from './EventRegistration';
import { useState } from 'react';

export default function EventDetails() {
  const { id } = useParams();
  const [showRegistration, setShowRegistration] = useState(false);
  
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return <Navigate to="/events" replace />;
  }

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link 
          to="/events"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div 
              className="h-[400px] bg-cover bg-center rounded-xl mb-8"
              style={{ backgroundImage: `url(${event.image})` }}
            />

            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                {event.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {event.date} at {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {event.spotsLeft} spots left
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  {typeof event.price === 'number' ? `$${event.price}` : event.price}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About This Event</h2>
                <p className="text-gray-600">{event.description}</p>
              </div>

              <button
                onClick={() => setShowRegistration(true)}
                className="w-full md:w-auto px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Register Now
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Location</h2>
            <div className="rounded-xl overflow-hidden h-[400px] bg-gray-100">
              <iframe
                title="Event Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(event.location)}`}
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Note: You'll need to replace YOUR_GOOGLE_MAPS_API_KEY with an actual Google Maps API key
            </p>
          </div>
        </div>
      </div>

      {showRegistration && (
        <EventRegistration
          event={event}
          onClose={() => setShowRegistration(false)}
        />
      )}
    </div>
  );
}