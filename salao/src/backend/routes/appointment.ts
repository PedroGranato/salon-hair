import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { finalizeAppointment } from '../controllers/appointmentController';

const router = Router();
router.post('/finalize', verifyToken, finalizeAppointment);
export default router;