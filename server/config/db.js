import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('La variable de entorno MONGODB_URI no está definida');
    }
    
    await mongoose.connect(mongoURI, {
      dbName: 'mi-tienda-online'
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