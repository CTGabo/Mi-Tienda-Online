import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { CATEGORIES } from '../../constants/categories';

function ProductManagement() {
  // ... estados y funciones anteriores sin cambios ...

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Productos</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <Input
          label="Nombre"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nombre del producto"
        />
        
        <Input
          label="Descripción"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Descripción del producto"
        />
        
        <Input
          label="Precio"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="0.00"
        />
        
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Selecciona una categoría</option>
          {CATEGORIES.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        
        <Input
          label="Stock"
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          placeholder="0"
        />
        
        <Input
          label="Imagen"
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />

        <Button 
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {selectedProduct ? 'Actualizar' : 'Crear'} Producto
        </Button>
      </form>

      {/* Lista de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">${product.price}</p>
            <p>Stock: {product.stock}</p>
            
            <div className="mt-4 space-x-2">
              <Button
                variant="secondary"
                onClick={() => setSelectedProduct(product)}
                disabled={loading}
              >
                Editar
              </Button>
              <Button
                variant="outline" // Cambiado de "danger" a "outline"
                onClick={() => handleDelete(product.id)}
                disabled={loading}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManagement