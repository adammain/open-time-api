require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const webpush = require('web-push')
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')

const employeesRouter = require('./employees/employees-router')
const hotelsRouter = require('./hotels/hotels-router')
const pairingsRouter = require('./pairings/pairings-router')
const layoversRouter = require('./layovers/layovers-router')
const pairingLegsRouter = require('./pairing_legs/pairing_legs-router')
const schedulesRouter = require('./schedule/schedules-router')

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
app.use(bodyParser.json())

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

// @TODO modify schedules endpoint so it returns only employees schedules
// @TODO add calendar endpoint to get cal days for each cal month
app.use('/api/employees', employeesRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/pairings', pairingsRouter)
app.use('/api/layovers', layoversRouter)
app.use('/api/pairing-legs', pairingLegsRouter)
app.use('/api/schedules', schedulesRouter)

app.post('/notifications/subscribe', (req, res) => {
  const subscription = req.body

  console.log(subscription)

  const payload = JSON.stringify({
    title: 'Hello!',
    body: 'It works.',
  })

  webpush.sendNotification(subscription, payload)
    .then(result => console.log(result))
    .catch(e => console.log(e.stack))

  res.status(200).json({'success': true})
})

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