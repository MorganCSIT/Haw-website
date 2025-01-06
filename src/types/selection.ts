export interface SelectionProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  onSelect: () => void;
}

export interface SelectionStepType {
  title: string;
  description: string;
  products: SelectionProduct[];
}