import jsonWebToken from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
interface JwtPayload {
  id: string
  email: string
  nama: string
  role: string
}

const generateAccessToken = (user: JwtPayload): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ??
      '1800s') as SignOptions['expiresIn']
  }

  return jsonWebToken.sign(user, process.env.JWT_SECRET, options)
}

const generateRefreshToken = (user: JwtPayload): string => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined')
  }
  const options: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ??
      '7d') as SignOptions['expiresIn']
  }
  return jsonWebToken.sign(user, process.env.JWT_REFRESH_SECRET, options)
}

export { generateAccessToken, generateRefreshToken }
