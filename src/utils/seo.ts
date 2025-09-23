export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function updatePageSEO(seoData: SEOData) {
  // Update document title
  document.title = seoData.title;

  // Update or create meta tags
  updateMetaTag('description', seoData.description);
  
  if (seoData.keywords) {
    updateMetaTag('keywords', seoData.keywords.join(', '));
  }

  // Open Graph tags
  updateMetaTag('og:title', seoData.title, 'property');
  updateMetaTag('og:description', seoData.description, 'property');
  updateMetaTag('og:type', seoData.type || 'website', 'property');
  
  if (seoData.image) {
    updateMetaTag('og:image', seoData.image, 'property');
  }
  
  if (seoData.url) {
    updateMetaTag('og:url', seoData.url, 'property');
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', seoData.title, 'name');
  updateMetaTag('twitter:description', seoData.description, 'name');
  
  if (seoData.image) {
    updateMetaTag('twitter:image', seoData.image, 'name');
  }
}

function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

export function generatePageTitle(title: string, siteName: string = 'Serenity Haven'): string {
  return `${title} | ${siteName}`;
}

export function generateBreadcrumbs(pathname: string): Array<{ label: string; path: string }> {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ label: 'Home', path: '/' }];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
    breadcrumbs.push({ label, path: currentPath });
  });

  return breadcrumbs;
}