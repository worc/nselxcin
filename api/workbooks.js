import express from 'express'
import query from './_query.js'

const router = express.Router()

router.route('/workbooks')
  .get(async (req, res) => {
    const result = await query('SELECT * FROM workbooks')
    res.send(result.rows)
  })

router.route('/workbook')
  .post(async (req, res) => {
    const text = `
      INSERT INTO workbooks(
        title,
        subtitle,
        authors,
        edition,
        version
      )
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `
    const values = [
      req.body.title,
      req.body.subtitle,
      req.body.authors,
      req.body.edition,
      req.body.version,
    ]
    const result = await query(text, values)
    res.send(result.rows[0])
  })

router.route('/workbook/:id')
  .get(async (req, res) => {
    const text = 'SELECT * FROM workbooks WHERE workbook_id = $1'
    const values = [req.params.id]
    const result = await query(text, values)

    res.send(result.rows[0])
  })
  .delete(async (req, res) => {
    const text = 'DELETE FROM workbooks WHERE workbook_id = $1'
    const values = [req.params.id]
    const result = await query(text, values)

    res.send(result.rows[0])
  })

export default router
