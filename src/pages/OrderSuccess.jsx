import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

function OrderSuccess() {
  const navigate = useNavigate();
  const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));

  useEffect(() => {
    if (!lastOrder) {
      navigate('/productos');
    }
  }, [lastOrder, navigate]);

  const handleContinueShopping = () => {
    localStorage.removeItem('lastOrder');
    navigate('/productos');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container mx-auto px-4 py-16 text-center"
    >
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 
          }}
        >
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </svg>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-3xl font-bold mb-4"
        >
          ¡Pago realizado con éxito!
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-gray-600 mb-4"
        >
          Gracias por tu compra. Recibirás un email con los detalles de tu pedido.
        </motion.p>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-gray-600 mb-8"
        >
          Número de orden: <span className="font-semibold">{lastOrder?.orderNumber}</span>
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <Button 
            variant="primary"
            onClick={handleContinueShopping}
            className="w-full hover:scale-105 transition-transform"
          >
            Continuar Comprando
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default OrderSuccess;