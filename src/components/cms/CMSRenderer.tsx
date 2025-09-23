import { ReactNode } from 'react';
import type { CMSSection } from '../../types/cms';
import TextSection from './sections/TextSection';
import ImageSection from './sections/ImageSection';
import GallerySection from './sections/GallerySection';
import TestimonialsSection from './sections/TestimonialsSection';
import StatsSection from './sections/StatsSection';
import FeaturesSection from './sections/FeaturesSection';

interface CMSRendererProps {
  sections: CMSSection[];
  className?: string;
}

export default function CMSRenderer({ sections, className = '' }: CMSRendererProps) {
  const renderSection = (section: CMSSection): ReactNode => {
    switch (section.type) {
      case 'text':
        return <TextSection key={section.id} section={section} />;
      case 'image':
        return <ImageSection key={section.id} section={section} />;
      case 'gallery':
        return <GallerySection key={section.id} section={section} />;
      case 'testimonials':
        return <TestimonialsSection key={section.id} section={section} />;
      case 'stats':
        return <StatsSection key={section.id} section={section} />;
      case 'features':
        return <FeaturesSection key={section.id} section={section} />;
      default:
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className={className}>
      {sortedSections.map(renderSection)}
    </div>
  );
}