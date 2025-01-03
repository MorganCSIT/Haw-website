export interface GalleryImage {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'cooking-class-jan',
    title: 'Thai Cooking Class',
    date: 'January 2024',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    category: 'learning'
  },
  {
    id: 'beach-cleanup',
    title: 'Community Beach Cleanup',
    date: 'December 2023',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    category: 'social'
  },
  {
    id: 'nye-dinner',
    title: 'New Year\'s Eve Dinner',
    date: 'December 2023',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    category: 'dining'
  }
];