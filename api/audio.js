import express from 'express'
import query from './_query.js'

async function getOrphanedAudio() {
  const text = `SELECT audio_id, filename FROM AUDIO WHERE NOT EXISTS (SELECT FROM phrases WHERE phrases.audio_id = audio.audio_id)`
  const result = await query(text)
  return result.rows
}

async function addAudio(file, filename, content_type) {
  const text = `INSERT INTO audio(file, filename, content_type) VALUES($1, $2, $3) RETURNING audio_id`
  const values = [file, filename, content_type]
  const result = await query(text, values)
  return result.rows
}

async function deleteAudio(id) {
  const text = `DELETE FROM audio WHERE audio_id = $1`
  const values = [id]
  return await query(text, values)
}

const router = express.Router()

router.route('/audio')
  .get(async (req, res) => {
    const orphanedAudio = await getOrphanedAudio()
    res.send(orphanedAudio)
  })
  .post(async (req, res) => {
    const filename = req.get('Filename')
    const content_type = req.get('Content-Type')
    const result = await addAudio(req.body, filename, content_type)
    res.send(result[0])
  })

router.route('/audio/:id')
  .get(async (req, res) => {
    const text = `SELECT file, octet_length(file) AS size, filename, content_type FROM audio WHERE audio_id = $1`
    const values = [req.params.id]
    const result = await query(text, values)
    const audio = result.rows[0]

    res.set('Content-Type', audio.content_type)
    res.set('Content-Length', audio.size)

    res.send(audio.file)
  })
  .delete(async (req, res) => {
    await deleteAudio(req.params.id)
    res.send('ok')
  })

router.route('/audio/:id/metadata')
  .get(async (req, res) => {
    const text = 'SELECT octet_length(file) AS size, filename, content_type FROM audio WHERE audio_id = $1'
    const values = [req.params.id]
    const result = await query(text, values)
    res.send(result.rows[0])
  })

export default router
