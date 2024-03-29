import express from 'express'
import request from 'request'
const app = express()

/************************************************************
 *
 * Express routes for:
 *   - app.js
 *   - style.css
 *   - index.html
 *
 ************************************************************/

// Serve application file depending on environment
app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/app.js')
  } else {
    // res.redirect('//localhost:9090/build/app.js')
    request('http://localhost:9090/build/app.js').pipe(res)
  }
})

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/style.css')
  } else {
    // res.redirect('//localhost:9090/build/style.css')
    request('http://localhost:9090/build/style.css').pipe(res)
  }
})

app.get('/api/unread/', (req, res) => {
  const offset = req.query['offset'] || 0
  const unreadUrl = 'https://feedwrangler.net/api/v2/feed_items/list?access_token=07de039941196f956e9e86e202574419&read=false&offset=' + offset
  console.log(unreadUrl)
  request(unreadUrl).pipe(res)
})

app.get('/api/markread', (req, res) => {
  let markReadUrl = 'https://feedwrangler.net/api/v2/feed_items/update?access_token=07de039941196f956e9e86e202574419&read=true'
  markReadUrl += '&feed_item_id=' + req.query['feed_item_id']
  console.log(markReadUrl)
  request(markReadUrl).pipe(res)
})

app.get('/api/mercury/', (req, res) => {
  const apiKey = 'vTNatJB4JsgmfnKysiE9cOuJonFib4U9176DRF2z'
  const postlightUrl = 'https://mercury.postlight.com/parser?url='+encodeURIComponent(req.query.url)
  const headers = {
    'x-api-key': apiKey
  }
  request({
    url: postlightUrl,
    headers: headers
  }).pipe(res)
})

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})

/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server')
  const config = require('./webpack.local.config')

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(9090, 'localhost', (err, result) => {
    if (err) {
      console.log(err)
    }
  })
}

/******************
 *
 * Express server
 *
 *****************/

const port = process.env.PORT || 8080
const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('Essential React listening at http://%s:%s', host, port)
})
