import { useState } from 'react';
import { events } from '../data/events';
import EventProductCard from '../components/events/EventProductCard';
import EventGallery from '../components/events/EventGallery';
import EventFilters, { EventFilter } from '../components/events/EventFilters';
import Newsletter from '../components/home/Newsletter';
import type { Event } from '../data/events';

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleFilterChange = (filters: EventFilter) => {
    const filtered = events.filter(event => {
      // Search term filter
      if (filters.searchTerm) {
        const searchText = filters.searchTerm.toLowerCase();
        const eventText = [
          event.title,
          event.description,
          event.location,
          event.category
        ].join(' ').toLowerCase();
        
        if (!eventText.includes(searchText)) {
          return false;
        }
      }

      // Category filter
      if (filters.category && event.category !== filters.category) {
        return false;
      }

      return true;
    });

    setFilteredEvents(filtered);
  };

  return (
    <div className="pt-16">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover and join our upcoming community events. Register early to secure your spot!
            </p>
          </div>

          <EventFilters onFilterChange={handleFilterChange} />

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No events match your current filters.</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your search criteria to find more events.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div key={event.id}>
                  <EventProductCard event={event} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <EventGallery />
      <Newsletter />
    </div>
  );
}