import express from 'express'
import bodyParser from 'body-parser'
import query from './_query.js'

async function getAllPhrases() {
  const result = await query(`SELECT phrases.phrase_id, salish, english, octet_length(file) AS size, filename FROM phrases JOIN audio ON phrases.audio_id = audio.audio_id`)
  return result.rows
}

async function insertPhrase(salish, english, salish_audio) {
  const text = `INSERT INTO phrases(
    salish,
    english,
    salish_audio
  ) VALUES($1, $2, $3) RETURNING phrase_id`

  const values = [ salish, english, salish_audio ]
  const result = await query(text, values)
  const phrase_id = result.rows[0].phrase_id
  console.log(phrase_id)
  return phrase_id
}

async function addSalishAudioToPhrase(id, audio) {
  const text = `UPDATE phrases SET salish_audio = $2 WHERE phrase_id = $1`
  const values = [id, audio]
  const result = await query(text, values)
  return result.rows
}

const router = express.Router()
const jsonParser = bodyParser.json()
const mpegParser = bodyParser.raw({ type: 'audio/mpeg', limit: '100MB' })

router.use(jsonParser)

router.route('/phrase/:id')
  .get(async (req, res) => {
    const text = `SELECT phrase_id, salish, english, octet_length(salish_audio) AS size FROM phrases WHERE phrase_id = $1`
    const values = [ req.params.id ]
    const result = await query(text, values)
    const phrase = result.rows[0]
    res.send({ ...phrase })
  })
  .delete(async (req, res) => {
    const text = `DELETE FROM phrases WHERE phrase_id = $1`
    const values = [ req.params.id ]
    await query(text, values)
    res.send('ok')
  })

router.route('/phrase/:id/audio')
  .all(mpegParser)
  .get(async (req, res) => {
    const text = `SELECT file, octet_length(file) AS size, filename FROM audio JOIN phrases ON phrases.audio_id = audio.audio_id WHERE phrases.phrase_id = $1`
    const values = [ req.params.id ]
    const result = await query(text, values)
    const audio = result.rows[0]

    res.set('Content-Type', 'audio/mpeg')
    res.set('Content-Length', `${audio.size}`)

    res.send(audio.file)
  })
  .put(async (req, res) => {
    await addSalishAudioToPhrase(req.params.id, req.body)
    res.send('ok')
  })

router.post('/phrase', async (req, res) => {
  console.log(req.body)
  const phrase_id = await insertPhrase(req.body.salish, req.body.english)
  res.send({ phrase_id })
})

router.get('/phrases', async (req, res) => {
  const phrases = await getAllPhrases()
  res.send(phrases)
})


export default router
