import { carePackages } from '../data/carePackages';
import { insuranceOptions } from '../data/insurance';
import { experiences } from '../data/experiences';
import { properties, getUniqueLocations, getUniquePropertyTypes } from '../data/properties';
import { events } from '../data/events';
import PackageCard from '../components/healthcare/PackageCard';
import InsuranceProductCard from '../components/insurance/InsuranceProductCard';
import ExperienceProductCard from '../components/experiences/ExperienceProductCard';
import PropertyProductCard from '../components/property/PropertyProductCard';
import EventProductCard from '../components/events/EventProductCard';

export const selectionSteps = [
  {
    title: "Select Healthcare Package",
    description: "Choose a healthcare package that suits your needs",
    component: () => (
      <div className="grid md:grid-cols-2 gap-8">
        {carePackages.map(pkg => (
          <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>
    )
  },
  {
    title: "Choose Insurance Coverage",
    description: "Select insurance coverage for your stay",
    component: () => (
      <div className="grid md:grid-cols-2 gap-8">
        {insuranceOptions.map(option => (
          <InsuranceProductCard key={option.id} insurance={option} />
        ))}
      </div>
    )
  },
  {
    title: "Plan Your Experience",
    description: "Choose from our curated experiences",
    component: () => (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiences.slice(0, 6).map(experience => (
          <ExperienceProductCard key={experience.id} experience={experience} />
        ))}
      </div>
    )
  },
  {
    title: "Find Your Property",
    description: "Discover your perfect property in Phuket",
    component: () => (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.slice(0, 6).map(property => (
          <PropertyProductCard key={property.id} property={property} />
        ))}
      </div>
    )
  },
  {
    title: "Join Community Events",
    description: "Connect with our vibrant community",
    component: () => (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <EventProductCard key={event.id} event={event} />
        ))}
      </div>
    )
  }
];