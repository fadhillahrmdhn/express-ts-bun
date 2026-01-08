import jsonWebToken from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'

export interface User {
  id: string
  email: string
  nama: string
  role: string
}

export interface UserPayload extends User, JwtPayload {}

const generateAccessToken = (user: User): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ??
      '1800s') as SignOptions['expiresIn']
  }

  return jsonWebToken.sign(user, process.env.JWT_SECRET, options)
}

const generateRefreshToken = (user: User): string => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined')
  }
  const options: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ??
      '7d') as SignOptions['expiresIn']
  }
  return jsonWebToken.sign(user, process.env.JWT_REFRESH_SECRET, options)
}

const verifyToken = (token: string): UserPayload | null => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined')
  }
  try {
    return jsonWebToken.verify(
      token,
      process.env.JWT_REFRESH_SECRET
    ) as UserPayload
  } catch {
    return null
  }
}

const parseJWT = (token: string): UserPayload => {
  const base64Payload = token.split('.')[1]
  if (!base64Payload) {
    throw new Error('Invalid token')
  }
  return JSON.parse(
    Buffer.from(base64Payload, 'base64').toString()
  ) as UserPayload
}

const verifyAccessToken = (token: string): UserPayload | null => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  try {
    return jsonWebToken.verify(token, process.env.JWT_SECRET) as UserPayload
  } catch {
    return null
  }
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  parseJWT,
  verifyAccessToken
}
