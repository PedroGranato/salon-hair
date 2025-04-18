import { Request, Response } from 'express'
import UserModel from '../models/Users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import router from './appointment'

export const register = async (req: Request, res: Response) => {
const { username, email, password, birthdate, telephone } = req.body

try {
    if (!username || !email || !password || !birthdate || !telephone) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
    return res.status(400).json({ message: 'Email já registrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
    birthdate,
    telephone
    })

    await newUser.save()

    res.status(201).json({ message: 'Usuário registrado com sucesso' })
} catch (err) {
    console.error('Erro ao registrar:', err)
    res.status(500).json({ message: 'Erro interno do servidor' })
}
}

export const login = async (req: Request, res: Response) => {
const { email, password } = req.body

try {
    const user = await UserModel.findOne({ email })
    if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
    return res.status(401).json({ message: 'Senha incorreta' })
    }

    const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
    )

    res.status(200).json({ token })
} catch (err) {
    console.error('Erro no login:', err)
    res.status(500).json({ message: 'Erro interno do servidor' })
}
}

export default router
