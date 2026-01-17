import type { NextFunction, Request, Response } from 'express'
import {
  inputUserValidation,
  loginUserValidation
} from '../validations/user.validation'
import { createUser, userLogin } from '../services/user.service'
import { compare, encrypt } from '../utils/bcrypt'
import {
  generateAccessToken,
  generateRefreshToken,
  parseJWT,
  verifyRefreshToken
} from '../utils/jwt'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { error, value } = inputUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0]?.message,
        message: 'Validasi input user gagal',
        data: null
      })
    }
    //bcrypt password sebelum disimpan ke database
    value.password = await encrypt(value.password)
    //hapus confirmPassword dari value karena tidak perlu disimpan di database, karena hanya untuk validasi saat input user saja. dan juga di schema database tidak ada field confirmPassword
    delete value.confirmPassword

    const user = await createUser(value)
    return res.status(200).json({
      error: null,
      message: 'Registrasi user berhasil',
      data: user
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    next(
      new Error(
        'Error pada file src/controllers/user.controller.ts: registerUser - ' +
          message
      )
    )
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { error, value } = loginUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0]?.message,
        message: 'input login user gagal',
        data: null
      })
    }
    const user = await userLogin(value)
    if (user == null) {
      return res.status(404).json({
        error: 'user tidak ditemukan',
        message: 'Login gagal',
        data: null
      })
    }
    if (!(await compare(value.password, user.password))) {
      return res.status(400).json({
        error: 'Email atau password salah',
        message: 'Login gagal',
        data: null
      })
    }

    user.password = '' //kosongkan password sebelum dikirim ke client

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    return res.status(200).json({
      error: null,
      message: 'Login user berhasil',
      data: user,
      accessToken,
      refreshToken
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    next(
      new Error(
        'Error pada file src/controllers/user.controller.ts: loginUser - ' +
          message
      )
    )
  }
}

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]
    if (token == null) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token tidak ditemukan',
        data: null
      })
    }
    const verify = verifyRefreshToken(token)
    if (verify == null) {
      return res.status(401).json({
        error: 'Token tidak valid',
        message: 'Refresh token gagal',
        data: null
      })
    }

    const data = parseJWT(token)
    const user = await userLogin(data)
    if (user == null) {
      return res.status(401).json({
        error: 'User tidak ditemukan',
        message: 'Refresh token gagal',
        data: null
      })
    }
    user.password = '' //kosongkan password sebelum dikirim ke client

    const newAccessToken = generateAccessToken(user)
    const newRefreshToken = generateRefreshToken(user)

    return res.status(200).json({
      error: null,
      message: 'Refresh token berhasil',
      data: user,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    next(
      new Error(
        'Error pada file src/controllers/user.controller.ts: refreshToken - ' +
          message
      )
    )
  }
}
