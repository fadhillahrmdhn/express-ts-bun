import { Router } from 'express'
import { registerUser } from '../controllers/user.controller'

const router = Router()

//http://localhost:4000/api/register
router.post('/register', registerUser)

export default router
