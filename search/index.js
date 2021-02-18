import express from 'express'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import renderPage from '../render_page.js'
import App from './app.js'

const router = express.Router()

router.get('/*', (req, res) => {
  res.status(200).send(renderPage('Search', (
    <StaticRouter context={{}}>
      <App/>
    </StaticRouter>
  ), '/static/search.js'))
})

export default router
