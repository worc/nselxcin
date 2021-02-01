import express from 'express'
import query from './_query.js'

async function getOrphanedAudio() {
  const text = `SELECT audio_id, filename FROM AUDIO WHERE NOT EXISTS (SELECT FROM phrases WHERE phrases.audio_id = audio.audio_id)`
  const result = await query(text)
  return result.rows
}

const router = express.Router()
// const jsonParser = bodyParser.json()

router.route('/audio')
  .get(async (req, res) => {
    const orphanedAudio = await getOrphanedAudio()
    res.send(orphanedAudio)
  })

export default router
