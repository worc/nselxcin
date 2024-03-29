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
      CREATE TRIGGER simple_english_vector_update BEFORE INSERT OR UPDATE
      ON phrases FOR EACH ROW EXECUTE PROCEDURE
      tsvector_update_trigger(
        simple_english_text_vector, 'pg_catalog.simple', english
      )
    `).then(logResponse)

  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('add trigger for english text vectors'))
