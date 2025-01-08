import { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import type { PropertyFilter } from '../../types/property';
import { formatPrice } from '../../utils/format';

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilter) => void;
  locations: string[];
  propertyTypes: string[];
}

export default function PropertyFilters({ onFilterChange, locations, propertyTypes }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<PropertyFilter>({
    ownershipTypes: [],
    priceRange: { min: 0, max: 5000000 },
    location: '',
    propertyType: '',
    searchTerm: ''
  });

  const handleFilterChange = (key: keyof PropertyFilter, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      ownershipTypes: [],
      priceRange: { min: 0, max: 5000000 },
      location: '',
      propertyType: '',
      searchTerm: ''
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFilterCount = filters.ownershipTypes.length + 
    (filters.location ? 1 : 0) + 
    (filters.propertyType ? 1 : 0) +
    (filters.priceRange.min > 0 || filters.priceRange.max < 5000000 ? 1 : 0) +
    (filters.searchTerm ? 1 : 0);

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          placeholder="Search properties..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>

      {/* Rest of the filters */}
      {/* ... existing filter code ... */}
    </div>
  );
}