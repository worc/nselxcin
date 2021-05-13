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
      SET simple_english_text_vector = to_tsvector('simple', phrases.english)
      WHERE phrases.english IS NOT NULL
    `).then(logResponse)

  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('generate text vectors for existing phrases'))
