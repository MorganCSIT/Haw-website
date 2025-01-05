// Utility functions for cart calculations
import type { CartItem } from '../lib/types/cart';

export function calculateItemTotal(item: CartItem): number {
  return item.price * item.quantity;
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + calculateItemTotal(item), 0);
}