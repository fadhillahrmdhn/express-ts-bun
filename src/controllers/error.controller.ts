import type { NextFunction, Request, Response } from 'express'
import logger from '../utils/winston'

export const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response | void => {
  const parts = err.message.split(' - ')
  const message = parts.length > 1 ? parts[1] : err.message
  logger.error(err)
  res.status(500).json({
    error: message,
    message: 'internal server error',
    data: null
  })
}

export const notFound = (req: Request, res: Response): Response | void => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Halaman tidak ditemukan',
    data: null
  })
}
