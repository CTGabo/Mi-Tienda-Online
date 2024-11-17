import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import ShippingOptions from '../components/ShippingOptions';

function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleShippingSelect = (method) => {
    setShippingMethod(method);
  };

  const getFinalTotal = () => {
    const subtotal = getTotal();
    const shipping = shippingMethod ? shippingMethod.price : 0;
    return subtotal + shipping;
  };

  const handleCheckout = async () => {
    if (!shippingMethod) {
      alert('Por favor selecciona un método de envío');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulamos un tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Crear detalles de la orden
      const orderDetails = {
        orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
        items: cart,
        shipping: shippingMethod,
        subtotal: getTotal(),
        shippingCost: shippingMethod.price,
        total: getFinalTotal(),
        date: new Date().toISOString()
      };

      // Guardar la orden en localStorage
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
      
      // Limpiar el carrito
      clearCart();
      
      // Redirigir a la página de éxito
      navigate('/order-success');
    } catch (error) {
      alert('Error al procesar la compra');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
        <p className="text-gray-600">Tu carrito está vacío</p>
        <Link 
          to="/productos" 
          className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      
      {/* Lista de productos */}
      <div className="space-y-4 mb-8">
        {cart.map(item => (
          <div 
            key={item._id} 
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Opciones de envío */}
      <div className="mb-8">
        <ShippingOptions onSelect={handleShippingSelect} />
      </div>

      {/* Resumen y total */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${getTotal().toFixed(2)}</span>
        </div>
        
        {shippingMethod && (
          <div className="flex justify-between">
            <span>Envío ({shippingMethod.name}):</span>
            <span>${shippingMethod.price.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-xl font-bold border-t pt-2">
          <span>Total:</span>
          <span>${getFinalTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Botón de checkout */}
      <div className="mt-6">
        <Button
          onClick={handleCheckout}
          disabled={isProcessing || !shippingMethod}
          className="w-full"
        >
          {isProcessing ? 'Procesando...' : 'Finalizar Compra'}
        </Button>
      </div>
    </div>
  );
}

export default Cart;