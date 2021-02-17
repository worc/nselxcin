import express from 'express'
import bodyParser from 'body-parser'

import AudioRoutes from './audio.js'
import PhraseRoutes from './phrases.js'
import SearchRoutes from './search.js'
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
// TODO declare a root route here: router.use('/audio', AudioRoutes) --- this is cheating since "audio" is a self-plural
// TODO instead of having to declare it down in the specific routers
// TODO alternatively... keep both: router.use(['/phrase', '/phrases'], PhraseRoutes)
// TODO but how does that look to the router? how do its declarations tell the difference?
router.use(AudioRoutes)
router.use(PhraseRoutes)
router.use(SearchRoutes)
router.use(WorkbookRoutes)

export default router
