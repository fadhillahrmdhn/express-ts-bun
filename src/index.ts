import Express, {
  type Application,
  type NextFunction,
  type Request,
  type Response
} from 'express'

const app: Application = Express()
const PORT: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3000

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, World!')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
