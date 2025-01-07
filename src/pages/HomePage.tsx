import { useTranslation } from 'react-i18next';
import Hero from '../components/hero/Hero';
import ValueProposition from '../components/home/ValueProposition';
import Services from '../components/Services';
import PartnershipSection from '../components/home/PartnershipSection';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      <ValueProposition />
      <Services />
      <PartnershipSection />
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  );
}