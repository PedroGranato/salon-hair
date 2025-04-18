import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import  authRoutes  from './routes/auth';
import appointmentRoutes from './routes/appointment';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log('Backend rodando na porta', process.env.PORT || 5000);
    });
});