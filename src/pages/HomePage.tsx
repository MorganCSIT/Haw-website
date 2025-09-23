import Hero from '../components/hero/Hero';
import { useSEO } from '../hooks/useSEO';
import ValueProposition from '../components/home/ValueProposition';
import Services from '../components/Services';
import PartnershipSection from '../components/home/PartnershipSection';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  useSEO({
    title: 'Home',
    description: 'Your dream retirement in paradise awaits. Experience luxury living, healthcare support, and investment opportunities in beautiful Phuket, Thailand.',
    keywords: ['Phuket retirement', 'Thailand property investment', 'assisted living', 'healthcare Thailand']
  });

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