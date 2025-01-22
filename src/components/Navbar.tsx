'use client';

import Link from 'next/link';
import Cart from './Cart';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-green-600">Vivero</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="/productos" 
              className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md transition-colors"
            >
              Productos
            </Link>
            <Cart />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Productos
          </Link>
          <div className="sm:hidden block px-3 py-2">
            <Cart />
          </div>
        </div>
      </div>
    </nav>
  );
}
