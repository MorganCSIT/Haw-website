import { useState } from "react";
import { events } from "../data/events";
import EventProductCard from "../components/events/EventProductCard";
import EventGallery from "../components/events/EventGallery";
import EventRegistration from "../components/events/EventRegistration";
import Newsletter from "../components/home/Newsletter";
import type { Event } from "../data/events";
import { ArrowDown } from "lucide-react";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const scrollToConsultationForm = () => {
    const formElement = document.getElementById("consultationForm");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pt-16">
      <section className="relative h-[60vh] min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Community Events
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Join our vibrant community events and activities. From cultural
                experiences to social gatherings, there's something for
                everyone.
              </p>
            </div>
            <button
              onClick={scrollToConsultationForm}
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors animate-bounce"
            >
              Join our Newsletter
              {/* Replace ArrowRight with your own imported icon component */}
              <ArrowDown className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover and join our upcoming community events. Register early to
              secure your spot!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id}>
                <EventProductCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <EventGallery />
      <Newsletter />
      <div id="consultationForm">
        {selectedEvent && (
          <EventRegistration
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
}
