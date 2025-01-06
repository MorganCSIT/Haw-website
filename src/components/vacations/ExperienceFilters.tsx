import { useState } from 'react';
import { Filter } from 'lucide-react';
import { formatPrice } from '../../utils/format';

interface ExperienceFiltersProps {
  onFilterChange: (filters: ExperienceFilter) => void;
  mobilityLevels: string[];
}

export interface ExperienceFilter {
  mobilityLevels: string[];
  priceRange: {
    min: number;
    max: number;
  };
  activities: string[];
}

export default function ExperienceFilters({ onFilterChange, mobilityLevels }: ExperienceFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<ExperienceFilter>({
    mobilityLevels: [],
    priceRange: { min: 0, max: 500 },
    activities: []
  });

  const activityTypes = [
    'Cultural', 'Wellness', 'Adventure', 'Nature', 'Photography', 'Culinary'
  ];

  const handleMobilityLevelToggle = (level: string) => {
    const newLevels = filters.mobilityLevels.includes(level)
      ? filters.mobilityLevels.filter(l => l !== level)
      : [...filters.mobilityLevels, level];
    
    handleFilterChange('mobilityLevels', newLevels);
  };

  const handleActivityToggle = (activity: string) => {
    const newActivities = filters.activities.includes(activity)
      ? filters.activities.filter(a => a !== activity)
      : [...filters.activities, activity];
    
    handleFilterChange('activities', newActivities);
  };

  const handleFilterChange = (key: keyof ExperienceFilter, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange = {
      ...filters.priceRange,
      [type]: value
    };

    if (type === 'min' && value > filters.priceRange.max) {
      newRange.max = value;
    } else if (type === 'max' && value < filters.priceRange.min) {
      newRange.min = value;
    }

    handleFilterChange('priceRange', newRange);
  };

  const resetFilters = () => {
    const defaultFilters = {
      mobilityLevels: [],
      priceRange: { min: 0, max: 500 },
      activities: []
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFilterCount = filters.mobilityLevels.length + 
    filters.activities.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < 500 ? 1 : 0);

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
          {/* Mobility Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mobility Level
            </label>
            <div className="flex flex-wrap gap-2">
              {mobilityLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleMobilityLevelToggle(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.mobilityLevels.includes(level)
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
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
                    max="500"
                    step="10"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Activity Types Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Activity Types
            </label>
            <div className="flex flex-wrap gap-2">
              {activityTypes.map((activity) => (
                <button
                  key={activity}
                  onClick={() => handleActivityToggle(activity)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.activities.includes(activity)
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}