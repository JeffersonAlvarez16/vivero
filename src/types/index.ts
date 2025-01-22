export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  modelo3d?: string; // URL to the 3D model file (GLTF/GLB format)
}

export interface CartItem extends Pick<Product, 'id' | 'nombre' | 'precio' | 'imagen'> {
  cantidad: number;
}
