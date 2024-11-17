import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from './common/Button';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Evitar que el clic se propague al contenedor
    setIsAdding(true);

    try {
      if (!product || !product._id) {
        throw new Error('Producto inválido');
      }

      const productToAdd = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      };

      await addToCart(productToAdd);
      
      const notification = document.createElement('div');
      notification.textContent = '¡Producto añadido!';
      notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 2000);

    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('Error al añadir el producto al carrito');
    } finally {
      setIsAdding(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/producto/${product._id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative z-0"
    >
      <div className="relative pb-[75%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2">
          Vendedor: {product.createdBy.username}
        </p>

        <pre className="text-gray-600 text-sm mb-4 line-clamp-3 font-sans">
          {product.description}
        </pre>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            variant="primary"
          >
            {isAdding ? 'Agregando...' : 'Agregar al Carrito'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;