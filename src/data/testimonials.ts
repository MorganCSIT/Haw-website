import { User } from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  text: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "John & Sarah Thompson",
    location: "United States",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    text: "Moving to Phuket was a dream come true. The team made everything seamless - from finding our villa to setting up healthcare.",
    service: "Property & Healthcare"
  },
  {
    id: "2",
    name: "David Wilson",
    location: "Australia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    text: "Their assisted vacation service was perfect for my elderly parents. Professional care while enjoying paradise.",
    service: "Assisted Vacation"
  },
  {
    id: "3",
    name: "Emma & Robert Chen",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    text: "The best investment decision we made. Their property management service makes everything hassle-free.",
    service: "Property Investment"
  }
];