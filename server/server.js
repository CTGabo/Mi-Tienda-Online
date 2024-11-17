require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/products');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://mi-tienda-online-4ip7gyv04-gabriel-silvas-projects-384ee268.vercel.app/',
    'http://localhost:5173'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
connectDB()
  .then(() => {
    console.log('Conexión a MongoDB establecida');
  })
  .catch((err) => {
    console.error('Error al conectar con MongoDB:', err);
    process.exit(1);
  });

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Manejo de errores de Multer
app.use((err, req, res, next) => {
  console.error('Error detallado:', err);
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: 'Error al subir el archivo: ' + err.message
    });
  }
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Error de validación: ' + err.message
    });
  }
  
  next(err);
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 3000; // Cambiado de process.env.PORT || 5000 a 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});