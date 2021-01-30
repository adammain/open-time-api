const path = require('path')
const express = require('express')
const xss = require('xss')
const LayoversService = require('./layovers-service')

const layoversRouter = express.Router()
const jsonParser = express.json()

const serializeLayovers = layover => ({
  id: layover.id,
  airport: layover.airport,
  duration: layover.duration,
  hotel: layover.hotel,
  pairing: layover.pairing,
  day_end: layover.day_end,
  report: layover.report 
})

layoversRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    LayoversService.getAllLayovers(knexInstance)
      .then(layovers => {
        res.json(layovers.map(serializeLayovers))
      })
      .catch(next)
  })

  layoversRouter
  .route('/:layover_id')
  .all((req, res, next) => {
    LayoversService.getById(
      req.app.get('db'),
      req.params.layover_id
    )
      .then(layover => {
        if (!layover) {
          return res.status(404).json({
            error: { message: `Layover doesn't exist` }
          })
        }
        res.layover = layover
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeLayovers(res.layover))
  })



module.exports = layoversRouter