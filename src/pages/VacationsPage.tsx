import { useState } from 'react';
import VacationHero from '../components/vacations/VacationHero';
import ExperiencesList from '../components/vacations/ExperiencesList';
import ConsultationForm from '../components/vacations/ConsultationForm';

export default function VacationsPage() {
  const [selectedExperience, setSelectedExperience] = useState('');

  return (
    <>
      <VacationHero />
      <ExperiencesList onExperienceSelect={setSelectedExperience} />
      <ConsultationForm selectedExperience={selectedExperience} />
    </>
  );
}