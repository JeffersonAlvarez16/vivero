'use client';

import { useFavoritesStore } from '@/store/favorites';
import ProductCard from '@/components/ProductCard';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';

export default function FavoritesPage() {
  const { items } = useFavoritesStore();

  return (
    <>
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Mis Favoritos
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Aquí encontrarás todas las plantas que has marcado como favoritas
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                Aún no tienes plantas favoritas. Explora nuestro catálogo y marca las que más te gusten.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/productos"
                className="inline-block mt-6 px-6 py-3 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-300"
              >
                Ver Productos
              </motion.a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
