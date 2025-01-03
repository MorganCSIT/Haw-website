import { LucideIcon } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  activities: string[];
  mobilityLevel: string;
}

export default function ExperienceCard({
  title,
  description,
  image,
  icon: Icon,
  activities,
  mobilityLevel,
}: ExperienceCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
          <Icon className="h-6 w-6 text-teal-600" />
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full mb-4">
            Mobility Level: {mobilityLevel}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Popular Activities:</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}