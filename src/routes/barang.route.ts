import { Router, type Request, type Response } from 'express'

const barangRouter = Router()

barangRouter.get('/barang', (req: Request, res: Response) => {
  res.status(200).json({ message: 'List of barang' })
})

export default barangRouter
