import jsonWebToken from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import type UserType from '../types/user.type'

const generateAccessToken = (user: UserType): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ??
      '1800s') as SignOptions['expiresIn']
  }

  return jsonWebToken.sign(user, process.env.JWT_SECRET, options)
}

const generateRefreshToken = (user: UserType): string => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined')
  }
  const options: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ??
      '7d') as SignOptions['expiresIn']
  }
  return jsonWebToken.sign(user, process.env.JWT_REFRESH_SECRET, options)
}

const verifyToken = (token: string): string | JwtPayload | null => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined')
  }
  try {
    return jsonWebToken.verify(token, process.env.JWT_REFRESH_SECRET)
  } catch {
    return null
  }
}

const parseJWT = (token: string): UserType => {
  const base64Payload = token.split('.')[1]
  if (!base64Payload) {
    throw new Error('Invalid token')
  }
  return JSON.parse(Buffer.from(base64Payload, 'base64').toString())
}

const verifyAccessToken = (token: string): string | JwtPayload | null => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  try {
    return jsonWebToken.verify(token, process.env.JWT_SECRET)
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
