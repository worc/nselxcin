import React from 'react'
import { renderToString } from 'react-dom/server'

export default function (title, app, staticUrl) {
  return `
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
        <script src="${staticUrl}"></script>
      </html>
    </html>
  `
}
