import { Pool } from 'pg'

// TODO parameterize or move to environment variables
const defaultPool = new Pool({
  database: 'nselxcin-test',
  host: 'localhost',
  password: 'salish',
  port: 5432,
  user: 'nselxcin',
})

export default async function (text, values = [], pool = defaultPool) {
  let result
  const client = await pool.connect()

  try {
    result = await client.query(text, values)
  } catch (e) {
    console.error(e)
  } finally {
    client.release()
  }

  return result
}
