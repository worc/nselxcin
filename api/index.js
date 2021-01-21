import express from 'express'
import bodyParser from 'body-parser'

const router = express.Router()
const jsonParser = bodyParser.json()

router.get('/', (req, res) => {
  res.send('api root')
})

router.post('/workbook', jsonParser, (req, res) => {
  console.log(req.body)
  res.send('ok')
})

export default router
