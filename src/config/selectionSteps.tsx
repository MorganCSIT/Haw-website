import { useState } from "react";
import { carePackages } from "../data/carePackages";
import { insuranceOptions } from "../data/insurance";
import { experiences } from "../data/experiences";
import {
  properties,
  getUniqueLocations,
  getUniquePropertyTypes,
} from "../data/properties";
import { events } from "../data/events";
import PackageCard from "../components/healthcare/PackageCard";
import InsuranceProductCard from "../components/insurance/InsuranceProductCard";
import ExperienceFilters from "../components/vacations/ExperienceFilters";
import ExperienceGrid from "../components/experiences/ExperienceGrid";
import PropertyFilters from "../components/property/PropertyFilters";
import PropertyGrid from "../components/property/PropertyGrid";
import EventProductCard from "../components/events/EventProductCard";
import { filterExperiences } from "../utils/experienceFilters";
import { filterProperties } from "../utils/propertyFilters";
import type { ExperienceFilter } from "../components/vacations/ExperienceFilters";
import type { PropertyFilter } from "../types/property";

export const selectionSteps = [
  {
    component: () => (
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Let’s Get Started!
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          We’ve prepared a straightforward process to help you customize your
          perfect Phuket experience—step by step. You’ll find healthcare and
          insurance options, fascinating excursions, property listings, and
          more.
        </p>
        <p className="text-xl text-gray-600 mb-4">
          Choose what matters to you most. By the end of this journey, you can
          send a single inquiry containing all your selections. It’s fast,
          simple, and stress-free!
        </p>
        <p className="text-xl text-gray-600">
          Ready to begin? Click “Next” and start exploring your opportunities in
          Phuket!
        </p>
      </div>
    ),
  },
  {
    title: "Select Healthcare Package",
    description: "Choose a healthcare package that suits your needs",
    component: () => (
      <div className="grid md:grid-cols-2 gap-8">
        {carePackages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>
    ),
  },
  {
    title: "Choose Insurance Coverage",
    description: "Select insurance coverage for your stay",
    component: () => (
      <div className="grid md:grid-cols-2 gap-8">
        {insuranceOptions.map((option) => (
          <InsuranceProductCard key={option.id} insurance={option} />
        ))}
      </div>
    ),
  },
  {
    title: "Plan Your Experience",
    description: "Choose from our curated experiences",
    component: () => {
      const ExperienceStep = () => {
        const [filteredExperiences, setFilteredExperiences] =
          useState(experiences);
        const mobilityLevels = Array.from(
          new Set(experiences.map((e) => e.mobilityLevel))
        );

        const handleFilterChange = (filters: ExperienceFilter) => {
          const filtered = filterExperiences(experiences, filters);
          setFilteredExperiences(filtered);
        };

        return (
          <div>
            <ExperienceFilters
              onFilterChange={handleFilterChange}
              mobilityLevels={mobilityLevels}
            />
            <ExperienceGrid
              experiences={filteredExperiences}
              itemsPerPage={6}
              onSelect={() => {}}
            />
          </div>
        );
      };
      return <ExperienceStep />;
    },
  },
  {
    title: "Find Your Property",
    description: "Discover your perfect property in Phuket",
    component: () => {
      const PropertyStep = () => {
        const [filteredProperties, setFilteredProperties] =
          useState(properties);

        const handleFilterChange = (filters: PropertyFilter) => {
          const filtered = filterProperties(properties, filters);
          setFilteredProperties(filtered);
        };

        return (
          <div>
            <PropertyFilters
              onFilterChange={handleFilterChange}
              locations={getUniqueLocations()}
              propertyTypes={getUniquePropertyTypes()}
            />
            <PropertyGrid properties={filteredProperties} itemsPerPage={6} />
          </div>
        );
      };
      return <PropertyStep />;
    },
  },
  {
    title: "Join Community Events",
    description: "Connect with our vibrant community",
    component: () => (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventProductCard key={event.id} event={event} />
        ))}
      </div>
    ),
  },
];
