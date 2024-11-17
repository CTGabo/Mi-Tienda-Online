import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Añadir al carrito
  const addToCart = (product, quantity = 1) => {
    try {
      if (!product || !product._id) {
        throw new Error('Producto inválido');
      }
  
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item._id === product._id);
        
        if (existingItem) {
          return prevCart.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        
        return [...prevCart, { ...product, quantity }];
      });
  
      // Opcional: Mostrar notificación de éxito
      console.log('Producto añadido exitosamente:', product);
    } catch (error) {
      console.error('Error en addToCart:', error);
      throw error; // Re-lanzar el error para manejarlo en el componente
    }
  };
  
  // Remover del carrito
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  // Actualizar cantidad
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Calcular total
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Obtener cantidad de items
  const getItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}