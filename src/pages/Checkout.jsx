import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../services/paymentService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  // Validaciones de inputs
  const validateCardNumber = (number) => {
    return number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const validateExpiry = (expiry) => {
    return expiry
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{0,2})/, '$1/$2')
      .substr(0, 5);
  };

  const validateCVC = (cvc) => {
    return cvc.replace(/\D/g, '').substr(0, 3);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplicar formato según el campo
    switch (name) {
      case 'cardNumber':
        formattedValue = validateCardNumber(value);
        break;
      case 'expiry':
        formattedValue = validateExpiry(value);
        break;
      case 'cvc':
        formattedValue = validateCVC(value);
        break;
      default:
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validaciones antes de procesar
      if (cart.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Crear intención de pago
      const { clientSecret } = await paymentService.createPaymentIntent(getTotal());
      
      // Procesar pago
      const result = await paymentService.processPayment(clientSecret, getTotal());
      
      if (result.success) {
        clearCart();
        navigate('/order-success');
      } else {
        setError('Error al procesar el pago');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de pago */}
        <div className="order-2 lg:order-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Información de Pago</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Información personal */}
              <div className="space-y-4">
                <Input
                  label="Nombre completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
                
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
                
                <Input
                  label="Dirección"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Calle Principal #123"
                />
                
                <Input
                  label="Ciudad"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Ciudad"
                />
              </div>

              {/* Información de pago */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-bold mb-4">Información de la tarjeta</h3>
                
                <div className="space-y-4">
                  <Input
                    label="Número de tarjeta"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength={19}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Fecha de expiración"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                      maxLength={5}
                    />
                    
                    <Input
                      label="CVC"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      placeholder="123"
                      required
                      maxLength={3}
                      type="password"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={loading || cart.length === 0}
                className="w-full"
              >
                {loading ? 'Procesando...' : `Pagar $${getTotal().toFixed(2)}`}
              </Button>
            </form>
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="order-1 lg:order-2">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
            
            {cart.length === 0 ? (
              <p className="text-gray-500">No hay productos en el carrito</p>
            ) : (
              <>
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between py-2">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 text-sm"> x {item.quantity}</span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;