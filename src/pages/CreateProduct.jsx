import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';
import { CATEGORIES } from '../constants/categories';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

function CreateProduct() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          setError('La imagen no debe superar los 5MB');
          return;
        }
        setFormData(prev => ({
          ...prev,
          image: file
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await productService.create(formData);
      if (response.success) {
        navigate('/productos');
      } else {
        setError('Error al crear el producto');
      }
    } catch (error) {
      setError(error.message || 'Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  const formInput = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500";

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre del Producto"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Ingrese el nombre del producto"
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del Producto
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Escribe una descripción detallada del producto..."
            className={`${formInput} resize-none`}
          />
          <p className="mt-1 text-sm text-gray-500">
            Incluye detalles importantes como características, materiales, dimensiones, etc.
          </p>
        </div>
        
        <Input
          label="Precio"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          placeholder="0.00"
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
          >
            <option value="">Selecciona una categoría</option>
            {CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <Input
          label="Stock"
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          min="0"
          placeholder="0"
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Imagen del Producto
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Vista previa"
              className="mt-2 h-32 w-32 object-cover rounded-lg"
            />
          )}
        </div>
  
        <Button 
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creando...' : 'Crear Producto'}
        </Button>
      </form>
    </div>
  );
}

export default CreateProduct;