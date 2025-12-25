import type { NextFunction, Request, Response } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'
import { getBarang } from '../services/barang.service'

export const getAllBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const data = await getBarang()
    return res.status(200).json({
      error: null,
      message: 'Pengambilan data barang berhasil',
      data
    })
  } catch (error) {
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: ' +
          (error as Error).message
      )
    )
  }
}

export const insertBarang = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const { error, value } = inputBarangValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        //error: error.details.map((detail) => detail.message),
        error: error.details[0]?.message,
        message: 'Validasi input barang gagal',
        data: value
      })
    }

    return res.status(200).json({
      error: null,
      message: 'Validasi input barang berhasil',
      data: value
    })
  } catch (error) {
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: ' +
          (error as Error).message
      )
    )
  }
}
