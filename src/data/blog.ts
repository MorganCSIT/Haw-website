import { Clock, User, Tag } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'thai-healthcare-system',
    title: 'Navigating Thailand\'s Healthcare System: A Comprehensive Guide',
    excerpt: 'Understanding the intricacies of healthcare in Thailand, from private hospitals to insurance coverage.',
    content: `Thailand's healthcare system is renowned for its quality and accessibility. Private hospitals in major cities like Bangkok and Phuket offer world-class medical care with English-speaking staff and international accreditation...`,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    author: 'Dr. Sarah Chen',
    date: '2024-01-15',
    readTime: 8,
    tags: ['Healthcare', 'Insurance', 'Expat Life']
  },
  {
    id: 'thai-visa-requirements',
    title: 'Long-term Visa Options for Retirees in Thailand',
    excerpt: 'A detailed breakdown of visa requirements and processes for those looking to retire in Thailand.',
    content: `Thailand offers several visa options for retirees, with the Retirement Visa (Non-Immigrant Visa O-A) being the most popular choice...`,
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    author: 'Mark Johnson',
    date: '2024-01-10',
    readTime: 10,
    tags: ['Visa', 'Legal', 'Retirement']
  },
  {
    id: 'cost-of-living',
    title: 'Real Cost of Living in Phuket: 2024 Edition',
    excerpt: 'An honest look at living expenses in Phuket, from housing to daily necessities.',
    content: `While Phuket is known for its luxury resorts and high-end properties, the cost of living can be quite reasonable depending on your lifestyle choices...`,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    author: 'Lisa Thompson',
    date: '2024-01-05',
    readTime: 12,
    tags: ['Lifestyle', 'Finance', 'Property']
  }
];