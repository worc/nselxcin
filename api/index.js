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

async function getAllWorkbooks() {
  let workbooks

  try {
    const client = await pool.connect()

    workbooks = await client.query(`SELECT * FROM workbooks`)

    client.release()

  } catch (error) {
    console.error(error)
  }

  return workbooks.rows
}

async function insertWorkbook(params) {
  let response

  const query = `INSERT INTO workbooks(
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

  console.log({ values })

  try {
    const client = await pool.connect()

    response = await client.query(query, values)

    client.release()

  } catch (error) {
    console.error(error)
  }

  return response
}

async function deleteWorkbook(workbook_id) {
  let response

  const query = `DELETE FROM workbooks WHERE workbook_id=$1`
  const values = [workbook_id]

  try {
    const client = await pool.connect()
    client.query(query, values)
    client.release()
  } catch (e) {
    console.error(e)
  }

  return response
}

router.get('/', (req, res) => {
  res.send('api root')
})

router.get('/workbooks', async (req, res) => {
  const workbooks = await getAllWorkbooks()
  console.log({ workbooks })
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
