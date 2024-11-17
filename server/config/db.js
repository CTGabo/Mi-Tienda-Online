import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('La variable de entorno MONGODB_URI no está definida');
    }

    // Validar formato de URL
    if (!mongoURI.includes('@') || !mongoURI.includes('mongodb+srv://')) {
      throw new Error('Formato de URL de MongoDB inválido');
    }

    console.log('Intentando conectar a MongoDB...');
    console.log('URL de MongoDB (ofuscada):', 
      mongoURI.replace(/:([^@]+)@/, ':****@'));
    
    await mongoose.connect(mongoURI, {
      dbName: 'mi-tienda-online' // Nombre específico de la base de datos
    });
    
    console.log('MongoDB conectado exitosamente');
    console.log('Base de datos:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
  } catch (err) {
    console.error('Error detallado de conexión:', {
      message: err.message,
      code: err.code,
      codeName: err.codeName
    });
    process.exit(1);
  }
};

export default connectDB;