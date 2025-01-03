import { Building, Home, Palmtree } from 'lucide-react';

export interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  features: string[];
  image: string;
}

export const properties: Property[] = [
  {
    id: "luxury-villa-1",
    title: "Luxury Pool Villa in Rawai",
    type: "Villa",
    price: 450000,
    location: "Rawai",
    bedrooms: 3,
    bathrooms: 3,
    area: 350,
    description: "Modern pool villa with stunning sea views, perfect for retirement or rental investment.",
    features: ["Private Pool", "Sea View", "Modern Kitchen", "Garden", "Security System"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "beachfront-condo-1",
    title: "Beachfront Condominium",
    type: "Condominium",
    price: 280000,
    location: "Kata",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    description: "Beachfront condo with direct beach access and resort facilities.",
    features: ["Beach Access", "Pool Access", "Gym", "24/7 Security", "Parking"],
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "investment-townhouse-1",
    title: "Modern Townhouse",
    type: "Townhouse",
    price: 320000,
    location: "Chalong",
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    description: "Contemporary townhouse in a quiet area, ideal for long-term investment.",
    features: ["Rooftop Terrace", "Modern Design", "Gated Community", "Near Amenities"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  }
];

export const investmentFacts = [
  {
    icon: Building,
    title: "Foreign Ownership",
    description: "Condominiums can be fully owned by foreigners, while houses require specific ownership structures."
  },
  {
    icon: Home,
    title: "Return on Investment",
    description: "Rental yields in Phuket typically range from 5-8% annually, with potential for capital appreciation."
  },
  {
    icon: Palmtree,
    title: "Growing Market",
    description: "Phuket's property market continues to grow with increasing demand from retirees and investors."
  }
];