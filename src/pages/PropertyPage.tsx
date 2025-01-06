import { useState } from 'react';
import { properties, getUniqueLocations, getUniquePropertyTypes } from '../data/properties';
import { pageHeaders } from '../data/pageHeaders';
import PageHeader from '../components/layout/PageHeader';
import PropertyGrid from '../components/property/PropertyGrid';
import PropertyFilters from '../components/property/PropertyFilters';
import InvestmentFacts from '../components/property/InvestmentFacts';
import InvestmentForm from '../components/property/InvestmentForm';
import type { PropertyFilter } from '../types/property';
import { filterProperties } from '../utils/propertyFilters';

export default function PropertyPage() {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleFilterChange = (filters: PropertyFilter) => {
    const filtered = filterProperties(properties, filters);
    setFilteredProperties(filtered);
  };

  return (
    <div className="pt-16">
      <PageHeader {...pageHeaders.property} />

      <section id="featured-properties" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our selection of premium properties, each offering unique investment potential.
            </p>
          </div>

          <PropertyFilters
            onFilterChange={handleFilterChange}
            locations={getUniqueLocations()}
            propertyTypes={getUniquePropertyTypes()}
          />

          <PropertyGrid properties={filteredProperties} itemsPerPage={6} />
        </div>
      </section>

      <InvestmentFacts />
      <InvestmentForm />
    </div>
  );
}