import DateRangeFilter from './DateRangeFilter';
import CategoryFilter from './CategoryFilter';
import StatusFilter from './StatusFilter';

interface InquiryFiltersProps {
  filters: {
    startDate: string;
    endDate: string;
    category: string;
    statuses: string[];
  };
  onFilterChange: (key: string, value: any) => void;
}

export default function InquiryFilters({ filters, onFilterChange }: InquiryFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <DateRangeFilter 
            onDateChange={(start, end) => {
              onFilterChange('startDate', start);
              onFilterChange('endDate', end);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <CategoryFilter
            selectedCategory={filters.category}
            onCategoryChange={(value) => onFilterChange('category', value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <StatusFilter
            selectedStatuses={filters.statuses}
            onStatusChange={(value) => onFilterChange('statuses', value)}
          />
        </div>
      </div>
    </div>
  );
}