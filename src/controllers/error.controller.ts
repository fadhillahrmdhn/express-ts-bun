import type { NextFunction, Request, Response } from 'express'
import logger from '../utils/winston'

export const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
  //Ubah nama next menjadi _next (atau _). Konvensi ESLint biasanya mengabaikan variabel yang diawali dengan underscore.
  // Express.js menentukan apakah sebuah middleware adalah "Error Handler" atau "Standard Middleware" semata-mata berdasarkan jumlah argumen (parameter) yang didefinisikan dalam fungsi tersebut, bukan berdasarkan nama variabelnya.  3 Argumen (req, res, next): Express menganggapnya middleware biasa.4 Argumen (err, req, res, next): Express menganggapnya Error Handler.
  // Jadi, jika Anda menulis (err, req, res, _next), jumlah argumennya tetap 4. Express akan tetap mengenalinya sebagai error handler. Penggunaan underscore (_) di awal nama variabel (_next) hanyalah konvensi di TypeScript/JavaScript untuk memberi tahu linter (seperti ESLint) bahwa variabel tersebut sengaja tidak digunakan, sehingga tidak memunculkan warning atau error.
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
