import express from 'express'
import query from './_query.js'

const router = express.Router()

router.route('/search/phrases')
  .get(async (req, res) => {
    const tsquery = req.query.q.split(' ').join(' | ')

    const text = `
      SELECT phrase_id, salish, english, vector, score
      FROM (
        SELECT 
          simple_english_text_vector AS vector,
          ts_rank_cd(simple_english_text_vector, to_tsquery($1)) AS score,
          phrase_id,
          salish,
          english
        FROM phrases
      ) AS phrases_search
      WHERE phrases_search.vector @@ to_tsquery($1) ORDER BY score DESC
    `
    const values = [tsquery]
    const result = await query(text, values)

    res.send(result.rows)
  })

export default router
