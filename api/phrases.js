import express from 'express'
import query from './_query.js'

const router = express.Router()

router.route('/phrases')
  .get(async (req, res) => {
    const result = await query(`SELECT phrases.phrase_id, salish, english, octet_length(file) AS size, filename FROM phrases JOIN audio ON phrases.audio_id = audio.audio_id`)

    res.send(result.rows)
  })

router.route('/phrase')
  // TODO handle creating a new phrase with a pre-existing audio_id
  // TODO with the 1:many relationship here, i think it would have to
  // TODO be supplied from the client instead of looked up during the query
  .post(async (req, res) => {
    const text = 'INSERT INTO phrases(salish, english) VALUES($1, $2) RETURNING *'
    const values = [req.body.salish, req.body.english]
    const result = await query(text, values)

    res.send(result.rows[0])
  })

router.route('/phrase/:id')
  .get(async (req, res) => {
    const text = 'SELECT phrase_id, salish, english, octet_length(salish_audio) AS size FROM phrases WHERE phrase_id = $1'
    const values = [req.params.id]
    const result = await query(text, values)

    res.send(result.rows[0])
  })
  .put(async (req, res) => {
    const text = 'UPDATE phrases SET salish = $1, english = $2 WHERE phrase_id = $3 RETURNING *'
    const values = [req.body.salish, req.body.english, req.params.id]
    const result = await query(text, values)

    res.send(result.rows[0])
  })
  .delete(async (req, res) => {
    const text = `DELETE FROM phrases WHERE phrase_id = $1 RETURNING *`
    const values = [req.params.id]
    const result = await query(text, values)

    res.send(result.rows[0])
  })

router.route('/phrase/:id/audio')
  .get(async (req, res) => {
    const text = `SELECT file, octet_length(file) AS size, filename FROM audio JOIN phrases ON phrases.audio_id = audio.audio_id WHERE phrases.phrase_id = $1`
    const values = [req.params.id]
    const result = await query(text, values)
    const audio = result.rows[0]

    res.set('Content-Type', 'audio/mpeg')
    res.set('Content-Length', `${audio.size}`)

    res.send(audio.file)
  })
  // TODO change to a POST? this is adding data
  // TODO remove entirely, bulk upload has a different process where
  // TODO the client handles the step-by-step procedure on its own to
  // TODO add an audio file, then relay its ID to the phrases endpoint
  .put(async (req, res) => {
    const audioText = 'INSERT INTO audio(file, filename, content_type) VALUES($1, $2, $3) RETURNING audio_id'
    const audioValues = [req.body, req.get('Filename'), req.get('Content-Type')]
    const audioResult = await query(audioText, audioValues)
    const audioId = audioResult.rows[0].audio_id

    const phrasesText = 'UPDATE phrases SET audio_id = $2 WHERE phrase_id = $1 RETURNING *'
    const phrasesValues = [req.params.id, audioId]
    const result = await query(phrasesText, phrasesValues)

    res.send(result.rows[0])
  })

router.put('/phrase/:phrase_id/audio/:audio_id', async (req, res) => {
  const text = `UPDATE phrases SET audio_id = $2 WHERE phrase_id = $1 RETURNING *`
  const values = [req.params.phrase_id, req.params.audio_id]
  const result = await query(text, values)

  res.send(result.rows[0])
})

export default router
