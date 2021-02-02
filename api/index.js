import express from 'express'
import bodyParser from 'body-parser'

import AudioRoutes from './audio.js'
import PhraseRoutes from './phrases.js'
import WorkbookRoutes from './workbooks.js'

const router = express.Router()
const jsonParser = bodyParser.json()
const mpegParser = bodyParser.raw({ type: 'audio/mpeg', limit: '100MB' })

router.use(jsonParser)
router.use(mpegParser)

router.get('/', (req, res) => {
  res.send('api root')
})

// TODO fix this whole pluralization mess
// TODO if the endpoint was consistent we could
// TODO declare a root route here: router.use('/audio', AudioRoutes)
// TODO instead of having to declare it down in the specific routers
router.use(AudioRoutes)
router.use(PhraseRoutes)
router.use(WorkbookRoutes)

export default router
