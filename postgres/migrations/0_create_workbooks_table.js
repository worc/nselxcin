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

    await client.query('DROP TABLE IF EXISTS workbooks;').then(logResponse)
    // await client.query('DROP TABLE IF EXISTS lessons')
    // await client.query('DROP TABLE IF EXISTS phrases')
    // await client.query('DROP TABLE IF EXISTS phrase_lists')

    await client.query(`CREATE TABLE workbooks (
      workbook_id INT GENERATED ALWAYS AS IDENTITY,
      title TEXT,
      subtitle TEXT,
      authors TEXT,
      edition TEXT,
      version TEXT
    );`).then(logResponse)
  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('database set up'))
