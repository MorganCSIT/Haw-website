import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Ruler, Bath, BedDouble } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyGallery from '../components/property/PropertyGallery';
import PropertyAvailability from '../components/property/PropertyAvailability';
import PropertyFeatures from '../components/property/PropertyFeatures';
import AddToCartButton from '../components/cart/AddToCartButton';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/format';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const property = properties.find(p => p.id === id);

  if (!property) {
    return <Navigate to="/property" replace />;
  }

  const handleAddToCart = () => {
    addToCart({
      id: property.id,
      name: property.title,
      description: `${property.type} in ${property.location}`,
      price: property.price,
      category: 'property'
    });
  };

  return (
    <div className="pt-20">
      <div className="container mx-auto px-6 py-12">
        <Link 
          to="/property"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <PropertyGallery property={property} />
            
            <div className="mt-12 space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  {property.location}
                </div>
                <p className="text-gray-600">{property.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200">
                <div className="flex items-center">
                  <BedDouble className="h-5 w-5 text-teal-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-medium">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-teal-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-medium">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Ruler className="h-5 w-5 text-teal-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-medium">{property.area} m²</p>
                  </div>
                </div>
              </div>

              <PropertyFeatures features={property.features} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(property.price)}
                </span>
              </div>

              <AddToCartButton onClick={handleAddToCart} />

              <div className="mt-8">
                <PropertyAvailability />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}