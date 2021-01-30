require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')

const employeesRouter = require('./employees/employees-router')
const pairingsRouter = require('./pairings/pairings-router')
const hotelsRouter = require('./hotels/hotels-router')

const app = express()

const morganOption = (process.env.NODE_ENV === 'production')
  ? 'tiny'
  : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
)

// @TODO Complete employees endpoint and tests
app.use('/api/employees', employeesRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/pairings', pairingsRouter)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app