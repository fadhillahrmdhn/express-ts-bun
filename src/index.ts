import web from './middleware/web'

const PORT: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3000

web.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} 🚀`)
})
