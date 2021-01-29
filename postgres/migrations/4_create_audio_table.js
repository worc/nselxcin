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

    await client.query('DROP TABLE IF EXISTS audio')

    await client.query(`CREATE TABLE audio (
      audio_id INT GENERATED ALWAYS AS IDENTITY,
      file BYTEA,
      filename TEXT,
      content_type TEXT,
      PRIMARY KEY (audio_id)
    )`).then(logResponse)
  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('audio table created'))
