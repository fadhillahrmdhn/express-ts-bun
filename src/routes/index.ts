import { Router } from 'express'
import barangRouter from './barang.route'

const router = Router()

//http://localhost:3000/api/barang
router.use('/api', barangRouter)

export default router
