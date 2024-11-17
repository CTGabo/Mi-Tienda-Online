import { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Pedidos</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div 
            key={order._id}
            className="border rounded-lg p-6 bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold">
                  Pedido #{order._id}
                </h3>
                <p className="text-gray-600">
                  Cliente: {order.user.name}
                </p>
                <p className="text-gray-600">
                  Email: {order.user.email}
                </p>
              </div>
              <div className="text-right">
                <Badge variant={order.status}>
                  {order.status}
                </Badge>
                <p className="mt-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item) => (
                <div 
                  key={item._id}
                  className="flex justify-between"
                >
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-bold flex justify-between">
                <span>Total:</span>
                <span>${order.totalPrice}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={() => handleStatusUpdate(order._id, 'processing')}
                disabled={order.status !== 'pending'}
              >
                Procesar
              </Button>
              <Button
                variant="success"
                onClick={() => handleStatusUpdate(order._id, 'shipped')}
                disabled={order.status !== 'processing'}
              >
                Enviar
              </Button>
              <Button
                variant="info"
                onClick={() => handleStatusUpdate(order._id, 'delivered')}
                disabled={order.status !== 'shipped'}
              >
                Entregar
              </Button>
              <Button
                variant="danger"
                onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                disabled={['delivered', 'cancelled'].includes(order.status)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderManagement;