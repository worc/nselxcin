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

    await client.query('ALTER TABLE phrases ADD PRIMARY KEY (phrase_id)').then(logResponse)

  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('set phrases.phrase_id as primary key'))
