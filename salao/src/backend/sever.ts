import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import connectDB from './db';
import authRoutes from './routes/auth';
import appointmentRoutes from './routes/appointment';

// carrega o .env que está em salon-hair/.env
dotenv.config({
  path: path.resolve(__dirname, '../../../.env')
});

const app = express();

// Middleware para permitir JSON no corpo da requisição
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Rotas principais
app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);

// Middleware de erro global
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('💥 Erro interno:', err);
  res.status(500).json({ message: err.message || 'Erro interno no servidor' });
});

// conectar no Mongo e subir o servidor
const PORT = process.env.PORT || 5174;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Backend rodando na porta ${PORT}`);
  });
});
