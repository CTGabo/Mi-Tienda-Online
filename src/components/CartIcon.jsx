import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartIcon() {
  const { cart } = useCart();
  
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/carrito" className="relative inline-block">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 text-gray-700 hover:text-blue-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;