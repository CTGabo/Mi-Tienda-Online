import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error de conexión MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;