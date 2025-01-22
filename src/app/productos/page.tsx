'use client';

import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import Navigation from '@/components/Navigation';

export default function ProductsPage() {
  return (
    <>
      <Navigation />
      <div className="bg-white min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Productos</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora nuestra selección de plantas y encuentra la perfecta para tu espacio
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-24">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
