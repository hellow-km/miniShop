const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

require('./model/connect.js')
new Promise((resolve, reject) => {
  resolve(require('./model/home_image_data.js'))
}).then(() => {
  require('./model/goodParams.js')
  require('./model/goodReviews.js')
})

const {
  home,
  info,
  login,
  cart,
  my
} = require('./router/index')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

//require('./model/home_image_data.js')

app.use(express.static('public'));

app.use(session({
  secret: 'secret key',
  resave: true,
  saveUninitialized: true,
}))

app.use((req, res, next) => {
  const cors = ['http://localhost:8080', 'http://192.168.2.101:8080']
  if (cors.indexOf(req.headers.origin) > -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    //res.header("Access-Control-Allow-Headers", "content-type");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'get,post')
    res.header('Access-Control-Allow-Credentials', true)
    res.setHeader('Content-Type', 'application/json');
  }
  next()
})

app.get('/public/images/fashion/1597885056025/*', function (req, res) {
  res.sendFile(__dirname + "/" + req.url);
})

app.get('/public/images/news/1597885587866/*', function (req, res) {
  res.sendFile(__dirname + "/" + req.url);
})

app.get('/public/images/select/1597885380298/*', function (req, res) {
  res.sendFile(__dirname + "/" + req.url);
})

app.use('/home', home)

app.use('/goodInfo', info)

app.use('/login', login)

app.use('/cart', cart)

app.use('/my', my)

app.listen(3000)
