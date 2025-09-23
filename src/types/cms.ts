export interface CMSContent {
  id: string;
  type: 'page' | 'blog' | 'service' | 'property' | 'event';
  title: string;
  slug: string;
  content: any;
  meta: {
    description?: string;
    keywords?: string[];
    image?: string;
  };
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  author_id?: string;
}

export interface CMSPage extends CMSContent {
  type: 'page';
  content: {
    hero?: {
      title: string;
      description: string;
      image: string;
      cta?: {
        text: string;
        link: string;
      };
    };
    sections: CMSSection[];
  };
}

export interface CMSSection {
  id: string;
  type: 'text' | 'image' | 'gallery' | 'form' | 'testimonials' | 'stats' | 'features';
  title?: string;
  content: any;
  order: number;
}

export interface CMSBlogPost extends CMSContent {
  type: 'blog';
  content: {
    excerpt: string;
    body: string;
    featured_image: string;
    tags: string[];
    author: string;
    read_time: number;
  };
}