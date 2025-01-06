import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ExperienceProductCard from './ExperienceProductCard';
import type { Experience } from '../../types/experiences';

interface ExperienceGridProps {
  experiences: Experience[];
  itemsPerPage?: number;
  onSelect: (experience: Experience) => void;
}

export default function ExperienceGrid({ experiences, itemsPerPage = 6, onSelect }: ExperienceGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [experiences]);

  const totalPages = Math.ceil(experiences.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExperiences = experiences.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('experiences')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  if (experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No experiences match your current filters.</p>
        <p className="text-sm text-gray-500 mt-2">Try adjusting your filters to see more options.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-sm text-gray-600 mb-4">
        Showing {startIndex + 1}-{Math.min(endIndex, experiences.length)} of {experiences.length} experiences
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentExperiences.map((experience) => (
          <div 
            key={experience.id}
            className="focus-within:ring-2 focus-within:ring-teal-500 rounded-xl"
            onClick={() => onSelect(experience)}
          >
            <ExperienceProductCard experience={experience} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full transition-colors ${
                  currentPage === page
                    ? 'bg-teal-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}