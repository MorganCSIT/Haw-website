import { Check } from 'lucide-react';

interface StatusFilterProps {
  selectedStatuses: string[];
  onStatusChange: (statuses: string[]) => void;
}

export default function StatusFilter({ selectedStatuses, onStatusChange }: StatusFilterProps) {
  const statuses = [
    { value: 'new', label: 'New' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' }
  ];

  const handleStatusToggle = (value: string) => {
    if (selectedStatuses.includes(value)) {
      onStatusChange(selectedStatuses.filter(status => status !== value));
    } else {
      onStatusChange([...selectedStatuses, value]);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => handleStatusToggle(status.value)}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              selectedStatuses.includes(status.value)
                ? 'bg-teal-100 text-teal-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {selectedStatuses.includes(status.value) && (
              <Check className="h-3 w-3 mr-1" />
            )}
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}