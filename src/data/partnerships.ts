import { Stamp, Scale, Stethoscope, Building, Compass, Users } from 'lucide-react';

export interface Partnership {
  id: string;
  name: string;
  description: string;
  icon: any;
  longDescription: string;
  benefits: string[];
  image: string;
}

export const partnerships: Partnership[] = [
  {
    id: "visa-services",
    name: "Thai Visa Experts",
    description: "Professional visa and immigration services for a worry-free stay",
    icon: Stamp,
    longDescription: "Our visa experts handle all types of Thai visas, from retirement to business, ensuring a smooth immigration process.",
    benefits: [
      "Retirement Visa Assistance",
      "Business Visa Processing",
      "Visa Extension Services",
      "Immigration Consulting"
    ],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "legal-services",
    name: "Thai Legal Associates",
    description: "Comprehensive legal services for expatriates in Thailand",
    icon: Scale,
    longDescription: "Expert legal team specializing in expatriate law, property transactions, and business setup in Thailand.",
    benefits: [
      "Property Law",
      "Business Registration",
      "Contract Review",
      "Legal Consultation"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "nursing-services",
    name: "Professional Nursing Network",
    description: "Qualified nursing care and medical support services",
    icon: Stethoscope,
    longDescription: "Network of certified nurses providing professional healthcare support in the comfort of your home.",
    benefits: [
      "24/7 Nursing Care",
      "Medical Coordination",
      "Home Healthcare",
      "Rehabilitation Support"
    ],
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "property-agents",
    name: "Phuket Property Partners",
    description: "Expert real estate agents for your perfect property",
    icon: Building,
    longDescription: "Leading real estate agency specializing in luxury properties and retirement homes in Phuket.",
    benefits: [
      "Property Search",
      "Investment Advice",
      "Market Analysis",
      "Property Management"
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "tour-services",
    name: "Phuket Elite Tours",
    description: "Personalized tour experiences for seniors",
    icon: Compass,
    longDescription: "Specialized tour operator providing comfortable and accessible travel experiences around Phuket.",
    benefits: [
      "Private Tours",
      "Accessible Transport",
      "Cultural Experiences",
      "Wellness Activities"
    ],
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "community-services",
    name: "Expat Community Network",
    description: "Connect with Phuket's thriving expatriate community",
    icon: Users,
    longDescription: "Active community network helping new residents integrate into life in Phuket.",
    benefits: [
      "Social Events",
      "Support Groups",
      "Activity Clubs",
      "Local Integration"
    ],
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  }
];