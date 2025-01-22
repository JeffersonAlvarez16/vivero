'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';
import { usePlantTrackingStore } from '@/store/plant-tracking';
import Image from 'next/image';
import { formatPrice } from '@/utils/format';
import { toast } from 'sonner';
import { Heart, ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Icon from './Icon';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToFavorites, removeItem: removeFromFavorites, isFavorite } = useFavoritesStore();
  const { addPlant } = usePlantTrackingStore();
  const [mounted, setMounted] = useState(false);
  const [isProductFavorite, setIsProductFavorite] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsProductFavorite(isFavorite(product.id));
  }, [isFavorite, product.id]);

  const handleAddToCart = () => {
    const { id, nombre, precio, imagen } = product;
    addItem({ id, nombre, precio, imagen });
    
    toast.success('Producto agregado', {
      description: `${nombre} se agregó al carrito`,
      action: {
        label: 'Ver carrito',
        onClick: () => document.getElementById('toggle-cart')?.click(),
      },
    });
  };

  const toggleFavorite = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id);
      setIsProductFavorite(false);
      toast.success(`${product.nombre} eliminado de favoritos`);
    } else {
      addToFavorites(product);
      setIsProductFavorite(true);
      toast.success(`${product.nombre} agregado a favoritos`);
    }
  };

  const handleAddToTracking = () => {
    addPlant({
      name: product.nombre,
      image: product.imagen,
      wateringSchedule: 7, // Default to weekly watering
    });
    toast.success('Planta agregada a tu seguimiento', {
      description: 'Puedes ver y gestionar tus plantas en "Mis Plantas"',
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="group absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-300 ${
              mounted && isProductFavorite 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600 group-hover:text-red-500'
            }`}
          />
        </button>

        {/* Image Container */}
        <div className="relative group">
          <Image
            src={product.imagen}
            alt={product.nombre}
            width={500}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg transition-transform duration-200 ease-in-out group-hover:scale-105"
          />
         
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
              {product.nombre}
            </h3>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
              {product.descripcion}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-green-600">
              {formatPrice(product.precio)}
            </p>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToTracking}
                className="p-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                title="Agregar a mis plantas"
              >
                <Plus className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Agregar</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3D Viewer Modal */}
    
    </>
  );
}
