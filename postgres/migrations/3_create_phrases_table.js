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

    await client.query('DROP TABLE IF EXISTS phrases')
    // await client.query('DROP TABLE IF EXISTS phrase_lists')

    await client.query(`CREATE TABLE phrases (
      phrase_id INT GENERATED ALWAYS AS IDENTITY,
      salish TEXT,
      english TEXT,
      salish_audio BYTEA
    )`).then(logResponse)
  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('phrases table created'))