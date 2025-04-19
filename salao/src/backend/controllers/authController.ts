// src/backend/controllers/authController.ts
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../models/Users'

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('🔍 register body:', req.body)             // 1️⃣
    const { username, email, telephone, birthdate, password } = req.body

    if (!username || !email || !telephone || !birthdate || !password) {
      res.status(400).json({ message: 'Todos os campos são obrigatórios' })
      return
    }

    const exists = await UserModel.findOne({ email })
    if (exists) {
      res.status(400).json({ message: 'Email já registrado.' })
      return
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = new UserModel({ username, email, telephone, birthdate, password: hashed })

    const saved = await user.save()
    console.log('✅ Usuário salvo:', saved)                  // 2️⃣

    res.status(201).json({ message: 'Usuário registrado com sucesso!' })
  } catch (err) {
    console.error('❌ Erro no register controller:', err)    // 3️⃣
    next(err)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'Email e senha são obrigatórios' })
      return
    }
    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(401).json({ message: 'Credenciais inválidas' })
      return
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      res.status(401).json({ message: 'Credenciais inválidas' })
      return
    }
    // aqui você gera o token, por exemplo:
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    })
    res.json({ token })
  } catch (err) {
    next(err)
  }
}
