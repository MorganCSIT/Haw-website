import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageSEO, generatePageTitle, type SEOData } from '../utils/seo';

export function useSEO(seoData: Partial<SEOData>) {
  const location = useLocation();

  useEffect(() => {
    const defaultSEO: SEOData = {
      title: generatePageTitle(seoData.title || 'Home'),
      description: seoData.description || 'Your trusted partner for retirement living and investment opportunities in Phuket, Thailand.',
      keywords: seoData.keywords || ['Phuket', 'retirement', 'Thailand', 'property investment', 'healthcare'],
      image: seoData.image || 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      url: `${window.location.origin}${location.pathname}`,
      type: seoData.type || 'website'
    };

    updatePageSEO(defaultSEO);
  }, [seoData, location.pathname]);
}