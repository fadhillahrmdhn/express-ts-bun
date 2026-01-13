import Express, { type Application } from 'express'
import appMiddleware from '.'

// File ini memisahkan pembuatan aplikasi (web.ts) dari konfigurasi middleware (middleware/index.ts) dan pelaksanaan server (src/index.ts)
const web: Application = Express()

web.use(appMiddleware)

export default web
