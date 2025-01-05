import { LucideIcon } from 'lucide-react';

export interface CarePackage {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  price: string;
  suitable: string[];
}