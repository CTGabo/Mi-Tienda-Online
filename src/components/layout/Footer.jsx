import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Enlaces */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="hover:text-gray-300">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/carrito" className="hover:text-gray-300">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>Email: contacto@mitienda.com</li>
              <li>Teléfono: (123) 456-7890</li>
              <li>Dirección: Calle Principal #123</li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                Facebook
              </a>
              <a href="#" className="hover:text-gray-300">
                Twitter
              </a>
              <a href="#" className="hover:text-gray-300">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 Mi Tienda Online. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;