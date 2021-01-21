import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('admin homepage')
})

export default router
