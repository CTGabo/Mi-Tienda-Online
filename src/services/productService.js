import { api } from './api';

export const productService = {
  // Obtener todos los productos
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  // Obtener un producto por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },

  // Crear un nuevo producto
  create: async (productData) => {
    try {
      const formData = new FormData();
      
      // Validar datos antes de enviar
      const requiredFields = ['name', 'description', 'price', 'category', 'stock'];
      for (const field of requiredFields) {
        if (!productData[field]) {
          throw new Error(`El campo ${field} es requerido`);
        }
      }

      // Convertir valores numéricos y validar
      if (Number(productData.price) <= 0) {
        throw new Error('El precio debe ser mayor a 0');
      }
      
      if (Number(productData.stock) < 0) {
        throw new Error('El stock no puede ser negativo');
      }

      // Agregar campos al FormData
      Object.keys(productData).forEach(key => {
        if (key === 'image' && productData[key] instanceof File) {
          formData.append('image', productData[key]);
        } else if (key === 'price' || key === 'stock') {
          formData.append(key, Number(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      });

      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error detallado:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Actualizar un producto
  update: async (id, productData) => {
    try {
      const formData = new FormData();
      
      Object.keys(productData).forEach(key => {
        if (key === 'image' && productData[key] instanceof File) {
          formData.append('image', productData[key]);
        } else if (key === 'price' || key === 'stock') {
          formData.append(key, Number(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      });

      const response = await api.put(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  },

  // Eliminar un producto
  delete: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  },

  // Buscar productos
  search: async (query) => {
    try {
      const response = await api.get(`/products/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw error;
    }
  }
};