export type OwnershipType = 'short_term' | 'leasehold' | 'freehold' | 'for_sale';

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
  ownershipType: OwnershipType;
}

export interface PropertyFilter {
  ownershipTypes: OwnershipType[];
  priceRange: {
    min: number;
    max: number;
  };
  location: string;
  propertyType: string;
}