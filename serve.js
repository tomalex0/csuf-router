var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')
var express = require('express')

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

// create express app
var app = express();

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

// create api router
var api = createApiRouter()

// mount api before csrf is appended to the app stack
app.use('/api', api)

// now add csrf, after the "/api" was mounted
app.use(csrfProtection)

app.get('/form', function(req, res) {
  // pass the csrfToken to the view
  res.json({ csrfToken: req.csrfToken() })
})

app.post('/process', parseForm, function(req, res) {
  res.send('csrf was required to get here')
})

function createApiRouter() {
  var router = new express.Router()

  router.post('/getProfile', function(req, res) {
    res.send('no csrf to post here')
  })
  
  router.get('/getProfile', function(req, res) {
    res.send('no csrf to get here')
  })

  return router
}

app.listen(80);
