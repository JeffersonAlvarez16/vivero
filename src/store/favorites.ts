import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface FavoritesStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (itemId: number) => void;
  isFavorite: (itemId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => ({
          items: [...state.items, item],
        }));
      },
      
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      isFavorite: (itemId) => {
        return get().items.some((item) => item.id === itemId);
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
