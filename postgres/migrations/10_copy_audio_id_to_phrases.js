const { migrationClient } = require('./_migration_client.js')

async function setup ({ log }) {
  const client = migrationClient()

  function logResponse (err, res) {
    if (log && res) {
      console.log(res)
    }
  }

  try {
    client.connect()

    await client.query(`
      UPDATE phrases
      SET audio_id = audio.audio_id
      FROM audio
      WHERE audio.phrase_id = phrases.phrase_id
    `).then(logResponse)

  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('copy audio_id to phrases'))
