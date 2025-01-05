import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem } from '../lib/types/cart';

interface CartStore {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: { items: [], total: 0 },
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: {
                items: state.cart.items.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
                total: state.cart.total + item.price,
              },
            };
          }
          return {
            cart: {
              items: [...state.cart.items, { ...item, quantity: 1 }],
              total: state.cart.total + item.price,
            },
          };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: {
            items: state.cart.items.filter((i) => i.id !== id),
            total: state.cart.total - state.cart.items.find((i) => i.id === id)!.price,
          },
        })),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const item = state.cart.items.find((i) => i.id === id);
          if (!item) return state;
          const oldTotal = item.price * item.quantity;
          const newTotal = item.price * quantity;
          return {
            cart: {
              items: state.cart.items.map((i) =>
                i.id === id ? { ...i, quantity } : i
              ),
              total: state.cart.total - oldTotal + newTotal,
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