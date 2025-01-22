import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlantNote {
  id: string;
  plantId: number;
  date: string;
  note: string;
  type: 'watering' | 'fertilizing' | 'pruning' | 'other';
}

interface TrackedPlant {
  id: number;
  name: string;
  image: string;
  dateAdded: string;
  lastWatered?: string;
  lastFertilized?: string;
  wateringSchedule: number; // days between watering
  notes: PlantNote[];
}

interface PlantTrackingStore {
  plants: TrackedPlant[];
  addPlant: (plant: Omit<TrackedPlant, 'notes' | 'dateAdded' | 'id'>) => void;
  removePlant: (plantId: number) => void;
  addNote: (plantId: number, note: Omit<PlantNote, 'id'>) => void;
  updateWateringDate: (plantId: number) => void;
  updateFertilizingDate: (plantId: number) => void;
  updateWateringSchedule: (plantId: number, days: number) => void;
  getPlant: (plantId: number) => TrackedPlant | undefined;
}

// Function to generate a UUID-like string
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const usePlantTrackingStore = create<PlantTrackingStore>()(
  persist(
    (set, get) => ({
      plants: [],
      
      addPlant: (plant) => {
        set((state) => {
          // Encontrar el ID más alto actual y agregar 1
          const maxId = state.plants.reduce((max, p) => Math.max(max, p.id), 0);
          return {
            plants: [
              ...state.plants,
              {
                ...plant,
                id: maxId + 1,
                dateAdded: new Date().toISOString(),
                notes: [],
              },
            ],
          };
        });
      },
      
      removePlant: (plantId) => {
        set((state) => ({
          plants: state.plants.filter((p) => p.id !== plantId),
        }));
      },

      addNote: (plantId, note) => {
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === plantId
              ? {
                  ...p,
                  notes: [
                    ...p.notes,
                    {
                      ...note,
                      id: generateId(),
                    },
                  ],
                }
              : p
          ),
        }));
      },

      updateWateringDate: (plantId) => {
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === plantId
              ? {
                  ...p,
                  lastWatered: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      updateFertilizingDate: (plantId) => {
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === plantId
              ? {
                  ...p,
                  lastFertilized: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      updateWateringSchedule: (plantId, days) => {
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === plantId
              ? {
                  ...p,
                  wateringSchedule: days,
                }
              : p
          ),
        }));
      },

      getPlant: (plantId) => {
        return get().plants.find((p) => p.id === plantId);
      },
    }),
    {
      name: 'plant-tracking-storage',
    }
  )
);
