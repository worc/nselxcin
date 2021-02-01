import express from 'express'
import bodyParser from 'body-parser'
import query from './_query.js'

async function getOrphanedAudio() {
  const text = `SELECT audio_id, filename FROM AUDIO WHERE NOT EXISTS (SELECT FROM phrases WHERE phrases.audio_id = audio.audio_id)`
  const result = await query(text)
  return result.rows
}

async function deleteAudio(id) {
  const text = `DELETE FROM audio WHERE audio_id = $1`
  const values = [id]
  return await query(text, values)
}

const router = express.Router()
const jsonParser = bodyParser.json()

router.route('/audio')
  .get(async (req, res) => {
    const orphanedAudio = await getOrphanedAudio()
    res.send(orphanedAudio)
  })

router.route('/audio/:id')
  .delete(jsonParser, async (req, res) => {
    await deleteAudio(req.params.id)
    res.send('ok')
  })

export default router
