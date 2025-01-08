import { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import type { Event } from '../../types/events';

interface EventFiltersProps {
  onFilterChange: (filters: EventFilter) => void;
}

export interface EventFilter {
  searchTerm: string;
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
}

export default function EventFilters({ onFilterChange }: EventFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<EventFilter>({
    searchTerm: '',
    category: '',
    priceRange: { min: 0, max: 500 }
  });

  const categories = ['learning', 'social', 'dining', 'tour'];

  const handleFilterChange = (key: keyof EventFilter, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      searchTerm: '',
      category: '',
      priceRange: { min: 0, max: 500 }
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFilterCount = (filters.searchTerm ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.priceRange.min > 0 || filters.priceRange.max < 500 ? 1 : 0);

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          placeholder="Search events..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>

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
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Event Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange('category', category === filters.category ? '' : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.category === category
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}