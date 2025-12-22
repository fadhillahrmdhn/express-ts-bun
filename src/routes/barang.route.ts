import { Router, type Request, type Response } from 'express'
import { inputBarangValidation } from '../validations/barang.validation.js'

const barangRouter = Router()

barangRouter.get('/barang', (req: Request, res: Response) => {
  res.status(200).json({ message: 'List of barang' })
})

barangRouter.post('/barang', (req: Request, res: Response) => {
  const { error, value } = inputBarangValidation(req.body)
  if (error != null) {
    return res.status(400).json({
      //error: error.details.map((detail) => detail.message),
      error: error.details.map,
      message: 'Validasi input barang gagal',
      data: value
    })
  }

  return res.status(200).json({
    error: null,
    message: 'Validasi input barang berhasil',
    data: value
  })
})

export default barangRouter
