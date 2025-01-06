import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import type { PropertyFilter, OwnershipType } from '../../types/property';
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
    priceRange: { min: 0, max: 5000000 }, // Increased max price to 5M
    location: '',
    propertyType: ''
  });

  const ownershipTypes: { value: OwnershipType; label: string; description: string }[] = [
    { value: 'short_term', label: 'Short Term Rental', description: 'Perfect for holiday rentals' },
    { value: 'leasehold', label: 'Leasehold', description: 'Long-term lease options' },
    { value: 'freehold', label: 'Freehold', description: 'Full ownership rights' },
    { value: 'for_sale', label: 'For Sale', description: 'Properties available for purchase' }
  ];

  const handleOwnershipTypeToggle = (value: OwnershipType) => {
    const newTypes = filters.ownershipTypes.includes(value)
      ? filters.ownershipTypes.filter(t => t !== value)
      : [...filters.ownershipTypes, value];
    
    handleFilterChange('ownershipTypes', newTypes);
  };

  const handleFilterChange = (key: keyof PropertyFilter, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange = {
      ...filters.priceRange,
      [type]: value
    };

    // Ensure min doesn't exceed max and max doesn't go below min
    if (type === 'min' && value > filters.priceRange.max) {
      newRange.max = value;
    } else if (type === 'max' && value < filters.priceRange.min) {
      newRange.min = value;
    }

    handleFilterChange('priceRange', newRange);
  };

  const resetFilters = () => {
    const defaultFilters = {
      ownershipTypes: [],
      priceRange: { min: 0, max: 5000000 },
      location: '',
      propertyType: ''
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  // Trigger initial filter
  useEffect(() => {
    onFilterChange(filters);
  }, []);

  const activeFilterCount = filters.ownershipTypes.length + 
    (filters.location ? 1 : 0) + 
    (filters.propertyType ? 1 : 0) +
    (filters.priceRange.min > 0 || filters.priceRange.max < 5000000 ? 1 : 0);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 mr-2" />
          <span className="font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full text-sm">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Reset filters
          </button>
        )}
      </div>

      {isOpen && (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          {/* Ownership Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Ownership Type
            </label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ownershipTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleOwnershipTypeToggle(type.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    filters.ownershipTypes.includes(type.value)
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-200'
                  }`}
                >
                  <div className="font-medium mb-1">{type.label}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Price Range
            </label>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{formatPrice(filters.priceRange.min)}</span>
                <span>{formatPrice(filters.priceRange.max)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="50000"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="50000"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location and Property Type Filters */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500 py-3"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500 py-3"
              >
                <option value="">All Types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}