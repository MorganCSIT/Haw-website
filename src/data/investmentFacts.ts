import { Building, Home, Palmtree } from 'lucide-react';

export interface InvestmentFact {
  icon: any;
  title: string;
  description: string;
}

export const investmentFacts: InvestmentFact[] = [
  {
    icon: Building,
    title: "Foreign Ownership",
    description: "Condominiums can be fully owned by foreigners, while houses require specific ownership structures."
  },
  {
    icon: Home,
    title: "Return on Investment",
    description: "Rental yields in Phuket typically range from 5-8% annually, with potential for capital appreciation."
  },
  {
    icon: Palmtree,
    title: "Growing Market",
    description: "Phuket's property market continues to grow with increasing demand from retirees and investors."
  }
];