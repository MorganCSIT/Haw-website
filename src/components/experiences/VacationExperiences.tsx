import { Bike, Umbrella, Leaf, Camera, Utensils, Waves } from 'lucide-react';
import ExperienceCard from './ExperienceCard';

const experiences = [
  {
    title: "Cultural Immersion",
    description: "Experience the rich Thai culture with guided temple visits, cooking classes, and local community interactions.",
    image: "https://images.unsplash.com/photo-1600590536039-bf96e785a76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Leaf,
    activities: [
      "Temple tours with experienced guides",
      "Traditional cooking classes",
      "Local market visits",
      "Cultural performances"
    ],
    mobilityLevel: "Moderate"
  },
  {
    title: "Leisure & Relaxation",
    description: "Unwind with premium spa treatments, beach activities, and scenic boat tours around Phuket.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Umbrella,
    activities: [
      "Luxury spa treatments",
      "Private beach access",
      "Sunset yacht cruises",
      "Meditation sessions"
    ],
    mobilityLevel: "Easy"
  },
  {
    title: "Active Adventure",
    description: "Explore Phuket's natural beauty through guided activities tailored to your fitness level.",
    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Bike,
    activities: [
      "Nature trail hikes",
      "Snorkeling expeditions",
      "Island hopping",
      "Golf sessions"
    ],
    mobilityLevel: "Active"
  },
  {
    title: "Photography & Nature",
    description: "Capture Phuket's stunning landscapes and wildlife with professional photography guides.",
    image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Camera,
    activities: [
      "Sunrise photography tours",
      "Wildlife spotting",
      "Botanical garden visits",
      "Photo workshops"
    ],
    mobilityLevel: "Moderate"
  },
  {
    title: "Culinary Journey",
    description: "Discover Thai cuisine through guided food tours, cooking classes, and premium dining experiences.",
    image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Utensils,
    activities: [
      "Street food tours",
      "Fine dining experiences",
      "Local market cooking",
      "Tea ceremonies"
    ],
    mobilityLevel: "Easy"
  },
  {
    title: "Island Life",
    description: "Experience the best of Phuket's island lifestyle with beach activities and water sports.",
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Waves,
    activities: [
      "Beach yoga sessions",
      "Swimming",
      "Kayaking",
      "Beachfront dining"
    ],
    mobilityLevel: "Moderate"
  }
];

export default function VacationExperiences() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Curated Experiences</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted vacation experiences, designed to accommodate various interests and mobility levels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">
            All experiences can be customized to your specific needs and preferences.
            Our team provides full assistance throughout your stay.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Plan Your Experience
          </a>
        </div>
      </div>
    </section>
  );
}