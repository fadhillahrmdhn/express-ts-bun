import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/user.controller'

const router = Router()

//http://localhost:4000/api/register
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router
