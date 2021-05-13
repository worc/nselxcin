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

    await client.query(`ALTER TABLE phrases ADD COLUMN simple_english_text_vector TSVECTOR`).then(logResponse)

  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('add english text vector to phrases'))
