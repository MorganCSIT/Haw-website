import { useState } from 'react';

const daysInMonth = 31;
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];

export default function PropertyAvailability() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability Calendar</h3>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth}>&larr;</button>
          <span className="font-medium">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button onClick={handleNextMonth}>&rarr;</button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="font-medium py-1">{day}</div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => (
            <div
              key={i}
              className="aspect-square flex items-center justify-center rounded hover:bg-gray-100"
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Contact us for specific availability dates and viewing arrangements.
        </div>
      </div>
    </div>
  );
}