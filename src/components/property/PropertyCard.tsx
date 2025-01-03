import { Property } from '../../data/properties';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${property.image})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{property.title}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-teal-600 font-semibold text-lg">
            {formatPrice(property.price)}
          </span>
          <span className="text-gray-600">{property.type}</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">{property.bedrooms}</span> Beds
          </div>
          <div>
            <span className="font-medium">{property.bathrooms}</span> Baths
          </div>
          <div>
            <span className="font-medium">{property.area}</span> m²
          </div>
        </div>
        <p className="text-gray-600 mb-4">{property.description}</p>
        <div className="flex flex-wrap gap-2">
          {property.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}