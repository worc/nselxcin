import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from './app/index.js';
import Api from './api/index.js'

const app = express();
const PORT = process.env.PORT || 3000;

const renderPage = (title, app) => `
  <!DOCTYPE html>
    <html lang="en">
      <style>html, body, #app { height: 100%; margin: 0; }</style> 
      <link href="/fonts/font_faces.css" rel="stylesheet">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <head>
        <title>${title}</title>
      </head>

      <body>
        <div id="app">${renderToString(app)}</div>
      </body>
      <script src="/static/client.js"></script>
    </html>
  </html>
`;

app.use('/fonts', express.static('fonts'))
app.use('/static', express.static('dist'))

app.use('/api', Api);

app.get('/*', (req, res) => {
    let pageTitle = 'Thunder Rolling to Higher Mountainsides';

    res.status(200).send(renderPage(pageTitle, (
      <StaticRouter context={{}} location={req.url}>
          <App host={req.headers.host} />
      </StaticRouter>
    )));
})

app.get('*', (req, res) => {
    res.status(404).send('404, not found')
})

app.listen(PORT, () => {
    console.log("Server listening on", PORT);
});
