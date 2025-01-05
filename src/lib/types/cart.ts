export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}