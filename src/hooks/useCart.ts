import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem } from '../lib/types/cart';
import { calculateCartTotal } from '../utils/cartCalculations';

interface CartStore {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: { items: [], total: 0 },
      
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.items.find((i) => i.id === item.id);
          let updatedItems;

          if (existingItem) {
            updatedItems = state.cart.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
          } else {
            updatedItems = [...state.cart.items, { ...item, quantity: 1 }];
          }

          return {
            cart: {
              items: updatedItems,
              total: calculateCartTotal(updatedItems),
            },
          };
        }),

      removeFromCart: (id) =>
        set((state) => {
          const updatedItems = state.cart.items.filter((i) => i.id !== id);
          return {
            cart: {
              items: updatedItems,
              total: calculateCartTotal(updatedItems),
            },
          };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const updatedItems = state.cart.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          );
          return {
            cart: {
              items: updatedItems,
              total: calculateCartTotal(updatedItems),
            },
          };
        }),

      clearCart: () => set({ cart: { items: [], total: 0 } }),
    }),
    {
      name: 'cart-storage',
    }
  )
);