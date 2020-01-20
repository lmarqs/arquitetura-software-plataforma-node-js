var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')))
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use('/echo', (req, res) => {
  res.render('pages/echo.ejs', { term: req.query.t })
})

app.use('*', (req, res) => res.render('pages/404.ejs'))

module.exports = app
