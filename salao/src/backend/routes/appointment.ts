import { Router } from 'express';
import cors from 'cors';
import { verifyToken } from '../middleware/authMiddleware';
import { finalizeAppointment } from '../controllers/appointmentController';

const router = Router();
router.use(cors());

interface MockAppointment {
    cliente: string;
    pagamento: string;
    servico: string;
    valor: string;
    funcionario: string;
    data: string;     
}

const MOCK_APPOINTMENTS: MockAppointment[] = [
    { cliente: 'Alice',   pagamento: 'Dinheiro', servico: 'Pé',       valor: 'R$50', funcionario: 'Denise', data: '2025-04-19' },
    { cliente: 'Bruno',   pagamento: 'Pix',       servico: 'Mão',      valor: 'R$40', funcionario: 'Ana',    data: '2025-04-18' },
    { cliente: 'Carla',   pagamento: 'Cartão',    servico: 'Pé e mão', valor: 'R$80', funcionario: 'Maria',  data: '2025-04-19' },
    { cliente: 'Diego',   pagamento: 'Dinheiro',  servico: 'Pé',       valor: 'R$55', funcionario: 'João',   data: '2025-04-17' },
];

router.get('/', (req, res) => {
    const paymentFilter   = req.query.paymentFilter   as string | undefined;
    const serviceFilter   = req.query.serviceFilter   as string | undefined;
    const funcionario     = req.query.funcionario     as string | undefined;
    const dateFilter      = req.query.date            as string | undefined;

    let list = MOCK_APPOINTMENTS;

if (paymentFilter && paymentFilter !== 'Todos') {
    list = list.filter(a => a.pagamento === paymentFilter);
}

if (serviceFilter && serviceFilter !== 'Todos') {
    list = list.filter(a => a.servico === serviceFilter);
}

if (funcionario && funcionario !== 'Todos') {
    list = list.filter(a => a.funcionario === funcionario);
}

if (dateFilter) {
    list = list.filter(a => a.data === dateFilter);
}

res.json(list);});

// Rota de finalizar 
router.post('/finalize', verifyToken, finalizeAppointment);

export default router;
