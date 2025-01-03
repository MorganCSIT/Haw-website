export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number | 'Free';
  category: 'learning' | 'social' | 'dining' | 'tour';
  image: string;
  capacity: number;
  spotsLeft: number;
}

export interface GalleryImage {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
}