import { useState } from 'react';

function ShippingOptions({ onSelect }) {
  const shippingMethods = [
    {
      id: 'standard',
      name: 'Envío Estándar',
      price: 5.99,
      time: '5-7 días hábiles',
      icon: '🚚'
    },
    {
      id: 'express',
      name: 'Envío Express',
      price: 12.99,
      time: '2-3 días hábiles',
      icon: '⚡'
    },
    {
      id: 'premium',
      name: 'Envío Premium',
      price: 19.99,
      time: '24 horas',
      icon: '✨'
    }
  ];

  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleSelect = (method) => {
    setSelectedMethod(method);
    onSelect(method);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Método de envío</h3>
      <div className="space-y-2">
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handleSelect(method)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedMethod?.id === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-gray-600">
                    Tiempo estimado: {method.time}
                  </p>
                </div>
              </div>
              <div className="text-lg font-semibold">${method.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShippingOptions;