import { Router } from 'express'
import barangRouter from './barang.route'
import { errorHandling, notFound } from '../controllers/error.controller'
import userRouter from './user.route'

const router = Router()

// Endpoint http://localhost:4000/api

// 1. Middleware Pertama
router.use('/api', barangRouter)

router.use('/api', userRouter)

// 2. Middleware Kedua (Standard)
router.use(notFound)

// 3. Middleware Ketiga (Error Handler)
router.use(errorHandling)

export default router
