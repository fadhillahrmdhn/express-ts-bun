import Express, { type Application } from 'express'
import appMiddleware from './middleware'

const app: Application = Express()
const PORT: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3000

app.use(appMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} 🚀`)
})
