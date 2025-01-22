import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cantidad'>) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, cantidad: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
              ),
            };
          }
          
          return {
            items: [...state.items, { ...item, cantidad: 1 }],
          };
        });
      },
      
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId, cantidad) => {
        if (cantidad <= 0) {
          get().removeItem(itemId);
          return;
        }
        
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, cantidad } : i
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.precio * item.cantidad,
          0
        );
      },
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.cantidad, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
