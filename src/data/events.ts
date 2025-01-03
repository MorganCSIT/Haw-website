import { Calendar, Users, Utensils, Ship, Book, Coffee } from 'lucide-react';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number | 'Free';
  category: 'learning' | 'social' | 'dining' | 'tour';
  image: string;
  capacity: number;
  spotsLeft: number;
}

export const events: Event[] = [
  {
    id: 'thai-cooking-class',
    title: 'Thai Cooking Masterclass',
    description: 'Learn authentic Thai recipes from local chefs in a hands-on cooking class.',
    date: '2024-02-15',
    time: '10:00 AM - 2:00 PM',
    location: 'Serenity Haven Culinary Center',
    price: 45,
    category: 'learning',
    image: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    capacity: 12,
    spotsLeft: 5
  },
  {
    id: 'sunset-cruise',
    title: 'Sunset Networking Cruise',
    description: 'Network with fellow expats while enjoying a beautiful sunset cruise around Phuket.',
    date: '2024-02-20',
    time: '4:30 PM - 7:30 PM',
    location: 'Chalong Pier',
    price: 65,
    category: 'social',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    capacity: 30,
    spotsLeft: 12
  },
  {
    id: 'coffee-meetup',
    title: 'Monthly Coffee Meetup',
    description: 'Casual morning meetup for community members to connect and share experiences.',
    date: '2024-02-10',
    time: '9:00 AM - 11:00 AM',
    location: 'Serenity Haven Café',
    price: 'Free',
    category: 'social',
    image: 'https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    capacity: 20,
    spotsLeft: 8
  }
];

export const categoryIcons = {
  learning: Book,
  social: Users,
  dining: Utensils,
  tour: Ship
};