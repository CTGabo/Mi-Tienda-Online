import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth` || 'http://localhost:3000/api/auth';export const authService = {
  register: async (userData) => {
    try {
      console.log('Intentando registrar con URL:', API_URL);
      const response = await axios.post(`${API_URL}/register`, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data.data && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error completo en registro:', error.response || error);
      throw new Error(
        error.response?.data?.message || 'Error al registrar usuario'
      );
    }
  },

    login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.data && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error completo:', error.response);
      throw new Error(
        error.response?.data?.message || 'Error al iniciar sesión'
      );
    }
  },


  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};