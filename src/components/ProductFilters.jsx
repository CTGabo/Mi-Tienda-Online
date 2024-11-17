import { useState } from 'react';
import { CATEGORIES } from '../constants/categories';
import Input from './common/Input';

function ProductFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Filtros</h3>
      
      {/* Categorías */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Categoría
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">Todas las categorías</option>
          {CATEGORIES.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Rango de precios */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Rango de precios
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            name="minPrice"
            placeholder="Mín"
            value={filters.minPrice}
            onChange={handleChange}
            min="0"
          />
          <Input
            type="number"
            name="maxPrice"
            placeholder="Máx"
            value={filters.maxPrice}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      {/* Ordenar por */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Ordenar por
        </label>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="newest">Más recientes</option>
          <option value="price_asc">Precio: Menor a Mayor</option>
          <option value="price_desc">Precio: Mayor a Menor</option>
          <option value="name_asc">Nombre: A-Z</option>
          <option value="name_desc">Nombre: Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilters;