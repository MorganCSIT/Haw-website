import { useState, useMemo } from 'react';
import { experiences } from '../../data/experiences';
import ExperienceGrid from '../experiences/ExperienceGrid';
import ExperienceDetailsModal from '../experiences/ExperienceDetailsModal';
import ExperienceFilters from './ExperienceFilters';
import { filterExperiences, getUniqueMobilityLevels } from '../../utils/experienceFilters';
import type { Experience } from '../../types/experiences';
import type { ExperienceFilter } from './ExperienceFilters';

interface ExperiencesListProps {
  onExperienceSelect: (title: string) => void;
}

export default function ExperiencesList({ onExperienceSelect }: ExperiencesListProps) {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);

  const mobilityLevels = useMemo(() => getUniqueMobilityLevels(experiences), []);

  const handleFilterChange = (filters: ExperienceFilter) => {
    const filtered = filterExperiences(experiences, filters);
    setFilteredExperiences(filtered);
  };

  const handleExperienceSelect = (experience: Experience) => {
    setSelectedExperience(experience);
    onExperienceSelect(experience.title);
  };

  return (
    <section id="experiences" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Experience</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our curated experiences or let us create a custom package just for you.
          </p>
        </div>

        <ExperienceFilters
          onFilterChange={handleFilterChange}
          mobilityLevels={mobilityLevels}
        />

        <ExperienceGrid
          experiences={filteredExperiences}
          itemsPerPage={6}
          onSelect={handleExperienceSelect}
        />
      </div>

      <ExperienceDetailsModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </section>
  );
}