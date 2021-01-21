import express from 'express'
import bodyParser from 'body-parser'
import { Pool } from 'pg'

const pool = new Pool({
  database: 'nselxcin-test',
  host: 'localhost',
  password: 'salish',
  port: 5432,
  user: 'nselxcin',
})

const router = express.Router()
const jsonParser = bodyParser.json()

async function query(text, values = []) {
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

async function getAllWorkbooks() {
  const result = await query(`SELECT * FROM workbooks`)
  return result.rows
}

async function insertWorkbook(params) {
  const text = `INSERT INTO workbooks(
    title,
    subtitle,
    authors,
    edition,
    version
  ) VALUES($1, $2, $3, $4, $5) RETURNING *`

  const values = [
    params.title,
    params.subtitle,
    params.authors,
    params.edition,
    params.version,
  ]

  return await query(text, values)
}

async function deleteWorkbook(workbook_id) {
  const text = `DELETE FROM workbooks WHERE workbook_id=$1`
  const values = [workbook_id]

  return await query(text, values)
}

router.get('/', (req, res) => {
  res.send('api root')
})

router.get('/workbooks', async (req, res) => {
  const workbooks = await getAllWorkbooks()
  res.send(workbooks)
})

router.post('/workbook', jsonParser, async (req, res) => {
  console.log(req.body)
  const result = await insertWorkbook(req.body)
  res.send(result)
})

router.delete('/workbook/:workbook_id', async (req, res) => {
  const result = await deleteWorkbook(req.params.workbook_id)
  res.send(result)
})

export default router
