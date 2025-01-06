import { LucideIcon } from 'lucide-react';

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  activities: string[];
  mobilityLevel: string;
  price: number;
}