import { experiences } from '../../data/experiences';
import ExperienceProductCard from '../experiences/ExperienceProductCard';

interface ExperiencesListProps {
  onExperienceSelect: (title: string) => void;
}

export default function ExperiencesList({ onExperienceSelect }: ExperiencesListProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Experience</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our curated experiences or let us create a custom package just for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div 
              key={experience.id}
              className="focus-within:ring-2 focus-within:ring-teal-500 rounded-xl"
              onClick={() => onExperienceSelect(experience.title)}
            >
              <ExperienceProductCard experience={experience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}