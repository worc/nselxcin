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

    await client.query('DROP TABLE IF EXISTS lessons')
    // await client.query('DROP TABLE IF EXISTS phrases')
    // await client.query('DROP TABLE IF EXISTS phrase_lists')

    await client.query(`CREATE TABLE lessons (
      lesson_id INT GENERATED ALWAYS AS IDENTITY,
      workbook_id INT,
      lesson_number INT,
      lesson_name TEXT,
      PRIMARY KEY (lesson_id),
      CONSTRAINT fk_workbook FOREIGN KEY(workbook_id) REFERENCES workbooks(workbook_id)
    );`).then(logResponse)
  } catch (error) {
    console.error(error)
  }

  client.end()
}

setup({ log: true }).then(() => console.log('lessons table created'))
