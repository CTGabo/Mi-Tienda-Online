import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

function Profile() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Aquí iría la lógica para actualizar el perfil
      await new Promise(resolve => setTimeout(resolve, 1000));
      // updateUser(formData);
      alert('Perfil actualizado con éxito');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />

          <Input
            label="Teléfono"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Tu número de teléfono"
          />

          <Input
            label="Dirección"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Tu dirección"
          />

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar Perfil'}
          </Button>
        </form>

        {/* Sección de pedidos recientes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Pedidos Recientes</h2>
          <div className="space-y-4">
            {/* Aquí irían los pedidos recientes */}
            <p className="text-gray-600">No hay pedidos recientes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;