import { Router } from 'express'
import barangRouter from './barang.route'
import { errorHandling, notFound } from '../controllers/error.controller'

const router = Router()

//http://localhost:3000/api/barang

// 1. Middleware Pertama
router.use('/api', barangRouter)

// 2. Middleware Kedua (Standard)
router.use(notFound)

// 3. Middleware Ketiga (Error Handler)
router.use(errorHandling)

export default router
