import { Hospital } from '../../data/insurance';

interface HospitalCardProps {
  hospital: Hospital;
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${hospital.image})` }}
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{hospital.name}</h3>
          {hospital.internationalPatients && (
            <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">
              International Patients
            </span>
          )}
        </div>
        
        <p className="text-gray-600 mb-4">{hospital.location}</p>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Key Specialties:</h4>
          <div className="flex flex-wrap gap-2">
            {hospital.specialties.map((specialty, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Facilities:</h4>
          <ul className="space-y-1">
            {hospital.facilities.map((facility, index) => (
              <li key={index} className="text-gray-600 flex items-center">
                <span className="text-teal-600 mr-2">•</span>
                {facility}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}