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

    await client.query(`ALTER TABLE audio ADD COLUMN phrase_id INT`).then(logResponse)

  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('add temporary phrase_id to audio'))
