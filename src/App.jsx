import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import ProductManagement from './pages/admin/ProductManagement';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import OrderManagement from './pages/admin/OrderManagement';
import ProtectedRoute from './components/common/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateProduct from './pages/CreateProduct';



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/mis-pedidos" element={<MyOrders />} />
            <Route path="/perfil" element={<Profile />} />
            
            {/* Rutas protegidas de admin */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute role="admin">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/productos" 
              element={
                <ProtectedRoute role="admin">
                  <ProductManagement />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/admin/ordenes" 
              element={
                <ProtectedRoute role="admin">
                  <OrderManagement />
                </ProtectedRoute>
              } 
            />
            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
  path="/crear-producto" 
  element={
    <ProtectedRoute>
      <CreateProduct />
    </ProtectedRoute>
  } 
/>
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;