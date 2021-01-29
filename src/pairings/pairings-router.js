const path = require('path')
const express = require('express')
const xss = require('xss')
const PairingsService = require('./pairings-service')

const pairingsRouter = express.Router()
const jsonParser = express.json()

const serializePairing = pairing => ({
  id: pairing.id,
  pairing_id: pairing.pairing_id,
  report: pairing.report,
  captain: pairing.captain,
  first_officer: pairing.first_officer,
  pair_start: pairing.pair_start,
  pair_end: pairing.pair_end,
  base: pairing.base,
  time_away_from_base: pairing.time_away_from_base,
  trip_rig: pairing.trip_rig,
  total_block: pairing.total_block,
  total_deadhead: pairing.total_deadhead,
  total_credit: pairing.total_credit,
  total_duty: pairing.total_duty,
  flight_duty_period: pairing.flight_duty_period,
  time_in_opentime: pairing.time_in_opentime
})

pairingsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PairingsService.getAllPairings(knexInstance)
      .then(pairings => {
        res.json(pairings.map(serializePairing))
      })
      .catch(next)
  })

  module.exports = pairingsRouter