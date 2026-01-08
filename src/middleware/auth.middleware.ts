import type { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt'

export interface User {
  id: string
  email: string
  nama: string
  role: string
}

export interface AuthRequest extends Request {
  user?: User
}

export const authenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (token == undefined) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'verifikasi token gagal',
      data: null
    })
  }
  const user = verifyAccessToken(String(token))
  if (user == null) {
    return res.status(401).json({
      error: 'Token tidak valid',
      message: 'verifikasi token gagal',
      data: null
    })
  }
  req.user = user as User
  next()
}
