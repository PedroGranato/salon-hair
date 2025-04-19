import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// carrega o .env que está em salon-hair/
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const connectDB = async () => {
  try {
    // pega MONGO_URI ou, se não existir, MONGODB_URI
    const uri = process.env.MONGO_URI ?? process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGO_URI / MONGODB_URI não definido no .env');
    }
    await mongoose.connect(uri);
    console.log('✅ MongoDB conectado com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao conectar no MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;