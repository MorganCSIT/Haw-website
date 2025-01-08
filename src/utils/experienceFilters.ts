import type { Experience } from '../types/experiences';
import type { ExperienceFilter } from '../components/vacations/ExperienceFilters';

export function filterExperiences(experiences: Experience[], filters: ExperienceFilter): Experience[] {
  return experiences.filter(experience => {
    // Mobility Level filter
    if (filters.mobilityLevels.length > 0 && !filters.mobilityLevels.includes(experience.mobilityLevel)) {
      return false;
    }

    // Price Range filter
    if (experience.price < filters.priceRange.min || experience.price > filters.priceRange.max) {
      return false;
    }

    // Activity Types filter
    if (filters.activities.length > 0) {
      const experienceActivities = experience.activities.join(' ').toLowerCase();
      const hasMatchingActivity = filters.activities.some(activity =>
        experienceActivities.includes(activity.toLowerCase())
      );
      if (!hasMatchingActivity) {
        return false;
      }
    }

    return true;
  });
}

export function getUniqueMobilityLevels(experiences: Experience[]): string[] {
  return Array.from(new Set(experiences.map(e => e.mobilityLevel))).sort();
}