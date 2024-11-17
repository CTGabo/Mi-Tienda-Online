import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('La variable de entorno MONGODB_URI no está definida');
    }

    console.log('URL de MongoDB (ofuscada):', 
      mongoURI.replace(/:([^@]+)@/, ':****@'));
    
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB conectado exitosamente');
    console.log('Base de datos:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Puerto:', mongoose.connection.port);
    console.log('Usuario:', mongoose.connection.user);
  } catch (err) {
    console.error('Error detallado de conexión:', err);
    process.exit(1);
  }
};

export default connectDB;