const { Client } = require('pg')

async function setup ({ log }) {
  const client = new Client({
    database: 'nselxcin-test',
    host: 'localhost',
    password: 'salish',
    port: 5432,
    user: 'nselxcin',
  })

  function logResponse (err, res) {
    if (log && res) {
      console.log(res)
    }
  }

  try {
    client.connect()

    await client.query(`
      INSERT INTO audio(file, phrase_id)
      SELECT salish_audio, phrase_id FROM phrases
      WHERE phrases.audio_id IS NULL
    `).then(logResponse)

  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('copy phrases.salish_audio, phrases.phrase_id to audio'))
