'use client';

import { useState } from 'react';
import { usePlantTrackingStore } from '@/store/plant-tracking';
import Navigation from '@/components/Navigation';
import { CalendarDaysIcon, ChartBarIcon, PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function MyPlantsPage() {
  const { plants, addNote, updateWateringDate, updateFertilizingDate } = usePlantTrackingStore();
  const [selectedPlant, setSelectedPlant] = useState<number | null>(null);

  const handleWatering = (plantId: number) => {
    updateWateringDate(plantId);
    addNote(plantId, {
      plantId,
      date: new Date().toISOString(),
      note: 'Planta regada',
      type: 'watering',
    });
  };

  const handleFertilizing = (plantId: number) => {
    updateFertilizingDate(plantId);
    addNote(plantId, {
      plantId,
      date: new Date().toISOString(),
      note: 'Planta fertilizada',
      type: 'fertilizing',
    });
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Mis Plantas</h1>
            <p className="mt-2 text-gray-600">
              Lleva un registro de tus plantas y su cuidado
            </p>
          </div>

          {plants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aún no tienes plantas registradas</p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                <PlusIcon className="h-5 w-5 mr-2" />
                Agregar mi primera planta
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plants.map((plant) => (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="relative h-48 mb-4">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {plant.name}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarDaysIcon className="h-5 w-5 mr-2" />
                      Último riego: {plant.lastWatered ? new Date(plant.lastWatered).toLocaleDateString() : 'No registrado'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ChartBarIcon className="h-5 w-5 mr-2" />
                      Riego cada {plant.wateringSchedule} días
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleWatering(plant.id)}
                      className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                      Registrar Riego
                    </button>
                    <button
                      onClick={() => handleFertilizing(plant.id)}
                      className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                    >
                      Fertilizar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
