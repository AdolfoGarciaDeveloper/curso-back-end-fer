const express = require('express')
const bodyParser = require('body-parser')
const rute = require('./routes')
const morgan = require('morgan')
const app = express()

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1',rute)

module.exports=app