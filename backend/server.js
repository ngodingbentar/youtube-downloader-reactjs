import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import apiRouter from './routers/apiRouter.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', apiRouter)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
app.get('/', (req, res) => {
  res.send('server is ready')
})
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message})
})
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})