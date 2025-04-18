import { Request, Response } from 'express'
import UserModel from '../models/Users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response) => {
  try {
    const { username, birthdate, telephone, email, password } = req.body


    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email já registrado.' })
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    
    const newUser = new UserModel({
      username,
      birthdate,
      telephone,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    res.status(201).json({ message: 'Usuário registrado com sucesso!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro no servidor.' })
  }
  console.log('🔍 Dados recebidos:', req.body)

}

