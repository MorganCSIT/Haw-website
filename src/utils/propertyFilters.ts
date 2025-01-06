import type { Property, PropertyFilter } from '../types/property';

export function filterProperties(properties: Property[], filters: PropertyFilter): Property[] {
  return properties.filter(property => {
    // Ownership Type filter - match if no types selected or property type is in selected types
    if (filters.ownershipTypes.length > 0 && !filters.ownershipTypes.includes(property.ownershipType)) {
      return false;
    }

    // Location filter
    if (filters.location && property.location !== filters.location) {
      return false;
    }

    // Property Type filter
    if (filters.propertyType && property.type !== filters.propertyType) {
      return false;
    }

    // Price Range filter
    const minPrice = filters.priceRange.min || 0;
    const maxPrice = filters.priceRange.max || Infinity;
    if (property.price < minPrice || property.price > maxPrice) {
      return false;
    }

    return true;
  });
}