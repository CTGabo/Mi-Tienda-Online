import { api } from './api';

export const paymentService = {
  createPaymentIntent: async (amount) => {
    try {
      const response = await api.post('/payments/create-intent', { amount });
      return response.data;
    } catch (error) {
      throw new Error('Error al crear la intención de pago');
    }
  },

  processPayment: async (paymentMethodId, amount) => {
    try {
      const response = await api.post('/payments/process', {
        paymentMethodId,
        amount
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al procesar el pago');
    }
  }
};