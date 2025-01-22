import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    nombre: 'Orquídea Mini',
    precio: 29.99,
    imagen: '/images/plantas/orquidea-mini.jpg',
    descripcion: 'Hermosa orquídea miniatura perfecta para interiores',
    categoria: 'interior'
  },
  {
    id: 2,
    nombre: 'Suculenta Mix',
    precio: 19.99,
    imagen: '/images/plantas/suculenta.jpg',
    descripcion: 'Set de suculentas variadas en maceta decorativa',
    categoria: 'suculentas'
  },
  {
    id: 3,
    nombre: 'Helecho Boston',
    precio: 24.99,
    imagen: '/images/plantas/helecho.jpg',
    descripcion: 'Helecho frondoso ideal para espacios sombreados',
    categoria: 'interior'
  }
];
