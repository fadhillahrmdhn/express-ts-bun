import type { NextFunction, Request, Response } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'
import {
  deleteBarang,
  getBarang,
  getBarangById,
  insertBarang,
  updateBarang
} from '../services/barang.service'

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
    const message = error instanceof Error ? error.message : String(error)
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: ' + message
      )
    )
  }
}

export const getDataBarangById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params
    const barang = await getBarangById(Number(id))
    return res.status(200).json({
      error: null,
      message: 'Pengambilan data barang berhasil',
      data: barang
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: ' + message
      )
    )
  }
}

export const insertDataBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
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
    const barang = await insertBarang(value)

    return res.status(200).json({
      error: null,
      message: 'Validasi input barang berhasil',
      data: barang
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: ' + message
      )
    )
  }
}

export const updateDataBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { error, value } = inputBarangValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        //error: error.details.map((detail) => detail.message),
        error: error.details[0]?.message,
        message: 'Validasi update barang gagal',
        data: value
      })
    }
    const barang = await updateBarang({ ...value, id: Number(id) })

    return res.status(200).json({
      error: null,
      message: 'Validasi update barang berhasil',
      data: barang
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: updateDataBarang' +
          message
      )
    )
  }
}

export const deleteDataBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params
    const barang = await deleteBarang(Number(id))

    return res.status(200).json({
      error: null,
      message: 'Validasi delete barang berhasil',
      data: barang
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    next(
      new Error(
        'Error pada file src/controllers/barang.controller.ts: deleteDataBarang' +
          message
      )
    )
  }
}
