import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from './app.js'

const router = express.Router()

const renderPage = (title, app) => `
  <!DOCTYPE html>
    <html lang="en">
      <style>html, body, #app { height: 100%; margin: 0; }</style> 
      <link href="https://fonts.googleapis.com/css?family=Rammetto+One|Lato" rel="stylesheet">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <head>
        <title>${title}</title>
      </head>

      <body>
        <div id="app">${renderToString(app)}</div>
      </body>
      <script src="/static/admin.js"></script>
    </html>
  </html>
`;

router.get('/*', (req, res) => {
  res.status(200).send(renderPage('Admin', (
    <StaticRouter context={{}}>
      <App/>
    </StaticRouter>
  )))
})

export default router
