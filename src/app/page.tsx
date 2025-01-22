'use client';

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import Navigation from '@/components/Navigation';

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Navigation />
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                <span className="block text-gray-900">Bienvenido a tu</span>
                <span className="block text-green-600">Vivero de Confianza</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                Descubre nuestra selección de plantas y productos para tu jardín.
                Tenemos todo lo que necesitas para hacer de tu espacio un lugar más verde y natural.
              </p>
              <div className="mt-5 sm:mt-8 flex justify-center">
                <Link
                  href="/productos"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                >
                  Ver Productos
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div id="categorias" className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Nuestras Categorías
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Explora nuestra variedad de plantas para cada espacio
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Interior Plants */}
              <Link href="/productos?categoria=interior" className="group">
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <img
                    src="/images/categories/interior.jpg"
                    alt="Plantas de Interior"
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 p-6">
                      <h3 className="text-xl font-semibold text-white">Plantas de Interior</h3>
                      <p className="mt-1 text-sm text-gray-200">Perfectas para decorar tu hogar</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Succulents */}
              <Link href="/productos?categoria=suculentas" className="group">
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <img
                    src="/images/categories/suculentas.jpg"
                    alt="Suculentas"
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 p-6">
                      <h3 className="text-xl font-semibold text-white">Suculentas</h3>
                      <p className="mt-1 text-sm text-gray-200">Resistentes y decorativas</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Outdoor Plants */}
              <Link href="/productos?categoria=exterior" className="group">
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <img
                    src="/images/categories/exterior.jpg"
                    alt="Plantas de Exterior"
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 p-6">
                      <h3 className="text-xl font-semibold text-white">Plantas de Exterior</h3>
                      <p className="mt-1 text-sm text-gray-200">Para jardines y terrazas</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Productos Destacados
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Descubre nuestras plantas más populares
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
