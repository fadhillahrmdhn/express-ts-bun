import { Router } from 'express'
import {
  getAllBarang,
  insertDataBarang,
  getDataBarangById,
  updateDataBarang,
  deleteDataBarang
} from '../controllers/barang.controller.js'

const barangRouter = Router()

barangRouter.get('/barang', getAllBarang)
barangRouter.get('/barang/:id', getDataBarangById)
barangRouter.post('/barang', insertDataBarang)
barangRouter.put('/barang/:id', updateDataBarang)
barangRouter.delete('/barang/:id', deleteDataBarang)

export default barangRouter
