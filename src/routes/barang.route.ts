import { Router } from 'express'
import {
  getAllBarang,
  insertDataBarang,
  getDataBarangById,
  updateDataBarang,
  deleteDataBarang
} from '../controllers/barang.controller.ts'

import { authenticated } from '../middleware/auth.middleware.js'

const barangRouter = Router()

barangRouter.get('/barang', authenticated, getAllBarang)
barangRouter.get('/barang/:id', authenticated, getDataBarangById)
barangRouter.post('/barang', authenticated, insertDataBarang)
barangRouter.put('/barang/:id', authenticated, updateDataBarang)
barangRouter.delete('/barang/:id', authenticated, deleteDataBarang)

export default barangRouter
