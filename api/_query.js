import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const defaultPool = new Pool({
  database: process.env.DB_NAME || 'nselxcin-test',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD || 'salish',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'nselxcin',
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
