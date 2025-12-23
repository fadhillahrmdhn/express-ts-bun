import type { NextFunction, Request, Response } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'

export const getAllBarang = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const data = [
      {
        id: 1,
        nama: 'Barang A',
        jumlah: 10,
        harga: 10000
      },
      {
        id: 2,
        nama: 'Barang B',
        jumlah: 5,
        harga: 20000
      },
      {
        id: 3,
        nama: 'Barang C',
        jumlah: 15,
        harga: 15000
      }
    ]
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
