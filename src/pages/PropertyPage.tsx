import { properties } from '../data/properties';
import PropertyCard from '../components/property/PropertyCard';
import InvestmentFacts from '../components/property/InvestmentFacts';
import InvestmentForm from '../components/property/InvestmentForm';

export default function PropertyPage() {
  return (
    <div className="pt-16">
      <section className="relative h-[60vh] min-h-[500px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Invest in Paradise
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Discover exclusive properties in Phuket's most desirable locations. 
                From beachfront villas to modern condominiums, find your perfect investment opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our selection of premium properties, each offering unique investment potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <InvestmentFacts />
      <InvestmentForm />
    </div>
  );
}