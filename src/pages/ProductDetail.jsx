import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productService } from '../services/productService';
import Button from '../components/common/Button';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    try {
      const productToAdd = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      };

      addToCart(productToAdd);
      alert('Producto añadido al carrito');
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('Error al añadir el producto al carrito');
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-8">Producto no encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-blue-600">${product.price.toFixed(2)}</p>
          <pre className="text-gray-600 whitespace-pre-wrap font-sans">{product.description}</pre>

          <div className="space-y-2">
            <p className="text-sm">Stock disponible: {product.stock}</p>
            <p className="text-sm">Categoría: {product.category}</p>
            <p className="text-sm">Vendedor: {product.createdBy?.username}</p>
            
            <Button 
              variant="primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full md:w-auto"
            >
              {product.stock === 0 ? 'Sin stock' : 'Añadir al Carrito'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;