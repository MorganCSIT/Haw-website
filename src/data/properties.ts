import { Building, Home, Palmtree } from 'lucide-react';
import type { Property } from '../types/property';

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
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "freehold"
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
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "short_term"
  },
  {
    id: "modern-apartment-1",
    title: "Modern Apartment in Patong",
    type: "Condominium",
    price: 180000,
    location: "Patong",
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    description: "Stylish apartment in the heart of Patong with mountain views.",
    features: ["Mountain View", "Fully Furnished", "Pool", "Fitness Center", "24/7 Security"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "freehold"
  },
  {
    id: "pool-villa-2",
    title: "Tropical Pool Villa",
    type: "Villa",
    price: 520000,
    location: "Chalong",
    bedrooms: 4,
    bathrooms: 4,
    area: 400,
    description: "Spacious tropical villa with private pool and lush gardens.",
    features: ["Private Pool", "Garden", "Outdoor Kitchen", "Staff Quarters", "CCTV"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "leasehold"
  },
  {
    id: "sea-view-condo-1",
    title: "Sea View Condominium",
    type: "Condominium",
    price: 350000,
    location: "Karon",
    bedrooms: 2,
    bathrooms: 2,
    area: 140,
    description: "Luxury condo with panoramic sea views and high-end finishes.",
    features: ["Sea View", "Infinity Pool", "Spa", "Restaurant", "Concierge"],
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "short_term"
  },
  {
    id: "investment-property-1",
    title: "Investment Townhouse",
    type: "Townhouse",
    price: 290000,
    location: "Kathu",
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    description: "Perfect investment property with strong rental potential.",
    features: ["Gated Community", "Garden", "Parking", "Storage", "Western Kitchen"],
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "for_sale"
  },
  {
    id: "luxury-penthouse-1",
    title: "Luxury Penthouse",
    type: "Penthouse",
    price: 750000,
    location: "Surin",
    bedrooms: 4,
    bathrooms: 4,
    area: 300,
    description: "Exclusive penthouse with private rooftop pool and ocean views.",
    features: ["Private Pool", "Ocean View", "Private Elevator", "Wine Cellar", "Smart Home"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "freehold"
  },
  {
    id: "beach-villa-1",
    title: "Beachfront Pool Villa",
    type: "Villa",
    price: 890000,
    location: "Bang Tao",
    bedrooms: 5,
    bathrooms: 5,
    area: 550,
    description: "Stunning beachfront villa with direct beach access and sunset views.",
    features: ["Beach Access", "Infinity Pool", "Home Theater", "Staff Quarters", "Garden"],
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "leasehold"
  },
  {
    id: "modern-townhouse-1",
    title: "Modern Townhouse",
    type: "Townhouse",
    price: 320000,
    location: "Chalong",
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    description: "Contemporary townhouse in a quiet area, ideal for families.",
    features: ["Rooftop Terrace", "Modern Design", "Gated Community", "Near Amenities"],
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "for_sale"
  },
  {
    id: "holiday-condo-1",
    title: "Holiday Apartment",
    type: "Condominium",
    price: 220000,
    location: "Patong",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    description: "Perfect holiday home with excellent rental potential.",
    features: ["Pool View", "Fully Furnished", "Rental Program", "Gym", "Restaurant"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "short_term"
  },
  {
    id: "luxury-condo-1",
    title: "Luxury Beach Condo",
    type: "Condominium",
    price: 420000,
    location: "Kamala",
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    description: "High-end beachfront condominium with luxury amenities.",
    features: ["Beach Access", "Infinity Pool", "Private Beach Club", "Concierge", "Spa"],
    image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "freehold"
  },
  {
    id: "pool-villa-3",
    title: "Family Pool Villa",
    type: "Villa",
    price: 620000,
    location: "Nai Harn",
    bedrooms: 4,
    bathrooms: 4,
    area: 450,
    description: "Spacious family villa with large garden and entertainment areas.",
    features: ["Private Pool", "Garden", "Entertainment Room", "Office", "Maid's Quarter"],
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "leasehold"
  },
  {
    id: "investment-condo-1",
    title: "Investment Studio",
    type: "Condominium",
    price: 150000,
    location: "Kathu",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    description: "Smart investment studio with guaranteed rental returns.",
    features: ["Fully Furnished", "Pool", "Gym", "Shuttle Service", "Rental Program"],
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "short_term"
  },
  {
    id: "sea-view-villa-1",
    title: "Sea View Pool Villa",
    type: "Villa",
    price: 980000,
    location: "Cape Yamu",
    bedrooms: 5,
    bathrooms: 6,
    area: 600,
    description: "Luxurious sea view villa with infinity pool and private beach access.",
    features: ["Infinity Pool", "Private Beach", "Wine Cellar", "Gym", "Cinema Room"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    ownershipType: "freehold"
  }
];

// Helper functions to get unique values for filters
export const getUniqueLocations = () => 
  Array.from(new Set(properties.map(p => p.location))).sort();

export const getUniquePropertyTypes = () => 
  Array.from(new Set(properties.map(p => p.type))).sort();