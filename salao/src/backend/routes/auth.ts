import { Router } from 'express'
import { register } from '../controllers/authController'
import { login } from '../controllers/authController'

const router = Router()

// rota de registro
router.post('/register', register)

// rota de login
router.post('/login', login)

export default router
