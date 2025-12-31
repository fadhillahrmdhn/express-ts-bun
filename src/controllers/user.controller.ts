import type { NextFunction, Request, Response } from 'express'
import { inputUserValidation } from '../validations/user.validation'
import { createUser } from '../services/user.service'
import { encrypt } from '../utils/bcrypt'

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
