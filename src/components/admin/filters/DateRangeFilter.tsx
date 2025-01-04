import { useState } from 'react';
import { format } from 'date-fns';

interface DateRangeFilterProps {
  onDateChange: (startDate: string, endDate: string) => void;
}

export default function DateRangeFilter({ onDateChange }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');

  const handleChange = (
    newStartDate: string,
    newEndDate: string,
    newStartTime: string,
    newEndTime: string
  ) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setStartTime(newStartTime);
    setEndTime(newEndTime);

    // Combine date and time for ISO string
    const start = newStartDate ? `${newStartDate}T${newStartTime}` : '';
    const end = newEndDate ? `${newEndDate}T${newEndTime}` : '';
    
    onDateChange(start, end);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex gap-1">
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleChange(e.target.value, endDate, startTime, endTime)}
          className="px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:ring-teal-500 focus:border-teal-500"
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => handleChange(startDate, endDate, e.target.value, endTime)}
          className="px-3 py-2 border border-gray-300 rounded-r-md text-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="flex gap-1">
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleChange(startDate, e.target.value, startTime, endTime)}
          className="px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:ring-teal-500 focus:border-teal-500"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => handleChange(startDate, endDate, startTime, e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-r-md text-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
    </div>
  );
}