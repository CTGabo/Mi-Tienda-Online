import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { productService } from '../services/productService';
import { CATEGORIES } from '../constants/categories';
import SearchBar from '../components/SearchBar';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts(); // Añade esta línea si no la tienes
  }, []);  // Añade este useEffect para cargar los productos
  
  useEffect(() => {
    console.log('Productos cargados:', products);
    // Verifica la estructura de los productos
    if (products.length > 0) {
      console.log('Ejemplo de producto:', products[0]);
    }
  }, [products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setFilteredProducts(data); // Inicialmente mostramos todos los productos
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = [...products];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, 'i');
      filtered = filtered.filter(product => 
        searchRegex.test(product.name) || 
        searchRegex.test(product.description)
      );
    }

    // Filtrar por categoría
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category === filters.category
      );
    }
  
    // Filtrar por precio mínimo
    if (filters.minPrice) {
      filtered = filtered.filter(product => 
        product.price >= parseFloat(filters.minPrice)
      );
    }
  
    // Filtrar por precio máximo
    if (filters.maxPrice) {
      filtered = filtered.filter(product => 
        product.price <= parseFloat(filters.maxPrice)
      );
    }
  
    // Ordenar productos
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
  
    setFilteredProducts(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    handleFilterChange({
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest'
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl">Cargando productos...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl text-red-600">Error: {error}</div>
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

   return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Nuestros Productos</h1>
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Filtros con animación */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-1"
        >
          <ProductFilters onFilterChange={handleFilterChange} />
        </motion.div>

        {/* Grid de productos con animación */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-3"
        >
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          Cargando productos...
        </motion.div>
      )}
      
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-500 py-8"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}

export default Products;