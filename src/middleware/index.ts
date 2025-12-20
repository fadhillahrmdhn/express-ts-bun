import Express from 'express'
import '../utils/winston'
import cors from 'cors'
import app from '../routes'

const appMiddleware = Express()

appMiddleware.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE'
  })
)
appMiddleware.options(/.*/, cors())
appMiddleware.use(Express.json())
appMiddleware.use(app)

export default appMiddleware
