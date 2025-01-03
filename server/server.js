import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/products.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configuración CORS actualizada
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://mi-tienda-online-delta.vercel.app',
  'https://mi-tienda-online-production.up.railway.app'
];

app.use(cors({
  origin: '*',  // Temporalmente permite todos los orígenes
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para logging de solicitudes
app.use((req, res, next) => {
  console.log({
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers,
    url: req.originalUrl
  });
  next();
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Conectar a MongoDB
connectDB()
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch((err) => {
    console.error('Error al conectar con MongoDB:', err);
    process.exit(1);
  });

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
  console.error('Error detallado:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
  
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor'
      : err.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log('Orígenes permitidos:', allowedOrigins);
});