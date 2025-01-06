import { Bike, Umbrella, Leaf, Camera, Utensils, Waves, Palette, Music, Book, Heart, Sunrise, Mountain, Fish, Dumbbell, Tent, Compass, Wine, Drum, Landmark, Palmtree } from 'lucide-react';
import type { Experience } from '../types/experiences';

export const experiences: Experience[] = [
  {
    id: 'cultural-immersion',
    title: "Cultural Immersion",
    description: "Experience the rich Thai culture with guided temple visits, cooking classes, and local community interactions.",
    image: "https://images.unsplash.com/photo-1600590536039-bf96e785a76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Landmark,
    activities: [
      "Temple tours with experienced guides",
      "Traditional cooking classes",
      "Local market visits",
      "Cultural performances",
      "Buddhist meditation sessions"
    ],
    mobilityLevel: "Moderate",
    price: 299
  },
  {
    id: 'wellness-retreat',
    title: "Wellness & Spa Retreat",
    description: "Unwind with premium spa treatments, beach activities, and scenic boat tours around Phuket.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Heart,
    activities: [
      "Luxury spa treatments",
      "Private beach access",
      "Sunset yacht cruises",
      "Meditation sessions",
      "Wellness workshops"
    ],
    mobilityLevel: "Easy",
    price: 399
  },
  {
    id: 'adventure-sports',
    title: "Adventure Sports",
    description: "Get your adrenaline pumping with exciting outdoor activities and water sports.",
    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Bike,
    activities: [
      "Scuba diving",
      "Rock climbing",
      "Mountain biking",
      "Kayaking",
      "Zip-lining"
    ],
    mobilityLevel: "Active",
    price: 349
  },
  {
    id: 'photo-expedition',
    title: "Photography Expedition",
    description: "Capture Phuket's stunning landscapes and wildlife with professional photography guides.",
    image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Camera,
    activities: [
      "Sunrise photography tours",
      "Wildlife spotting",
      "Landscape photography",
      "Photo editing workshops",
      "Night photography sessions"
    ],
    mobilityLevel: "Moderate",
    price: 279
  },
  {
    id: 'culinary-journey',
    title: "Culinary Journey",
    description: "Discover Thai cuisine through guided food tours, cooking classes, and premium dining experiences.",
    image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Utensils,
    activities: [
      "Street food tours",
      "Fine dining experiences",
      "Local market cooking",
      "Tea ceremonies",
      "Fruit carving classes"
    ],
    mobilityLevel: "Easy",
    price: 249
  },
  {
    id: 'island-hopping',
    title: "Island Hopping Adventure",
    description: "Explore the beautiful islands around Phuket with guided boat tours and beach activities.",
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Waves,
    activities: [
      "Phi Phi Islands tour",
      "Snorkeling",
      "Beach picnics",
      "Swimming",
      "Sunset viewing"
    ],
    mobilityLevel: "Moderate",
    price: 329
  },
  {
    id: 'art-culture',
    title: "Art & Culture Tour",
    description: "Immerse yourself in Phuket's vibrant art scene and cultural heritage.",
    image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Palette,
    activities: [
      "Art gallery visits",
      "Traditional crafts workshops",
      "Museum tours",
      "Local artist meetings",
      "Batik painting"
    ],
    mobilityLevel: "Easy",
    price: 199
  },
  {
    id: 'music-dance',
    title: "Music & Dance Experience",
    description: "Learn traditional Thai music and dance in interactive workshops.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Music,
    activities: [
      "Traditional dance lessons",
      "Music workshops",
      "Cultural performances",
      "Instrument making",
      "Evening shows"
    ],
    mobilityLevel: "Moderate",
    price: 229
  },
  {
    id: 'educational-tour',
    title: "Educational Discovery",
    description: "Learn about Thai history, language, and culture through interactive experiences.",
    image: "https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Book,
    activities: [
      "Language classes",
      "History tours",
      "Cultural workshops",
      "Traditional craft lessons",
      "Local school visits"
    ],
    mobilityLevel: "Easy",
    price: 189
  },
  {
    id: 'sunrise-yoga',
    title: "Sunrise Yoga & Meditation",
    description: "Start your day with beachfront yoga and mindfulness practices.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Sunrise,
    activities: [
      "Morning yoga sessions",
      "Meditation practices",
      "Breathing workshops",
      "Beach walks",
      "Mindfulness training"
    ],
    mobilityLevel: "Moderate",
    price: 159
  },
  {
    id: 'hiking-trekking',
    title: "Hiking & Trekking",
    description: "Explore Phuket's natural beauty through guided hiking and trekking adventures.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Mountain,
    activities: [
      "Jungle trekking",
      "Waterfall hikes",
      "Nature walks",
      "Bird watching",
      "Photography stops"
    ],
    mobilityLevel: "Active",
    price: 239
  },
  {
    id: 'fishing-trip',
    title: "Traditional Fishing Trip",
    description: "Experience local fishing methods and enjoy fresh seafood.",
    image: "https://images.unsplash.com/photo-1514469038448-52b1300c9c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Fish,
    activities: [
      "Traditional fishing",
      "Seafood preparation",
      "Local village visits",
      "Cooking lessons",
      "Boat trips"
    ],
    mobilityLevel: "Moderate",
    price: 269
  },
  {
    id: 'fitness-training',
    title: "Fitness & Training",
    description: "Stay fit with personalized training sessions and outdoor activities.",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Dumbbell,
    activities: [
      "Personal training",
      "Beach workouts",
      "Swimming sessions",
      "Nutrition guidance",
      "Recovery techniques"
    ],
    mobilityLevel: "Active",
    price: 299
  },
  {
    id: 'camping-adventure',
    title: "Eco Camping Adventure",
    description: "Connect with nature through guided camping experiences.",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Tent,
    activities: [
      "Tent camping",
      "Outdoor cooking",
      "Star gazing",
      "Nature walks",
      "Wildlife spotting"
    ],
    mobilityLevel: "Active",
    price: 219
  },
  {
    id: 'nature-exploration',
    title: "Nature Exploration",
    description: "Discover Phuket's diverse ecosystems and wildlife.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Compass,
    activities: [
      "Mangrove tours",
      "Wildlife watching",
      "Plant identification",
      "Nature photography",
      "Environmental education"
    ],
    mobilityLevel: "Moderate",
    price: 199
  },
  {
    id: 'wine-tasting',
    title: "Wine & Dine Experience",
    description: "Enjoy premium wine tasting and fine dining experiences.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Wine,
    activities: [
      "Wine tasting sessions",
      "Gourmet dining",
      "Food pairing",
      "Cooking demonstrations",
      "Restaurant tours"
    ],
    mobilityLevel: "Easy",
    price: 379
  },
  {
    id: 'drumming-workshop',
    title: "Traditional Drumming",
    description: "Learn traditional Thai drumming and rhythm techniques.",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Drum,
    activities: [
      "Drum workshops",
      "Rhythm training",
      "Performance practice",
      "Cultural history",
      "Group sessions"
    ],
    mobilityLevel: "Easy",
    price: 169
  },
  {
    id: 'temple-tour',
    title: "Temple & Heritage Tour",
    description: "Visit Phuket's most significant temples and historical sites.",
    image: "https://images.unsplash.com/photo-1600111809030-8f55a0a0873b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Landmark,
    activities: [
      "Temple visits",
      "Historical tours",
      "Cultural workshops",
      "Meditation sessions",
      "Architecture tours"
    ],
    mobilityLevel: "Moderate",
    price: 189
  },
  {
    id: 'garden-tour',
    title: "Tropical Garden Tour",
    description: "Explore beautiful tropical gardens and learn about local flora.",
    image: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Palmtree,
    activities: [
      "Garden tours",
      "Plant workshops",
      "Flower arranging",
      "Herbal medicine",
      "Photography sessions"
    ],
    mobilityLevel: "Easy",
    price: 149
  },
  {
    id: 'beach-wellness',
    title: "Beach Wellness Day",
    description: "Combine beach activities with wellness practices for a rejuvenating experience.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    icon: Umbrella,
    activities: [
      "Beach yoga",
      "Massage therapy",
      "Meditation",
      "Swimming",
      "Sunset relaxation"
    ],
    mobilityLevel: "Easy",
    price: 259
  }
];

export const getUniqueMobilityLevels = () => 
  Array.from(new Set(experiences.map(e => e.mobilityLevel))).sort();