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
  duration: pairing.duration,
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

pairingsRouter
  .route('/:pairing_id')
  .all((req, res, next) => {
    const { pairing_id } = req.params
    PairingsService.getById(req.app.get('db'), pairing_id)
      .then(pairing => {
        if (!pairing) {
          logger.error(`Pairing with id ${pairing_id} not found.`)
          return res.status(404).json({
            error: { message: `Pairing Not Found` }
          })
        }
        res.pairing = pairing
        next()
      })
      .catch(next)
  })
  .get((req, res) => {
    res.json(serializePairing(res.pairing))
  })
  .patch(jsonParser, (req, res, next) => {
    // TODO: update for all captains to add pairing
    console.log("Change Me")
    const { first_officer } = req.body
    const pairingToUpdate = { first_officer, time_in_opentime: null }

    const numberOfValues = Object.values(pairingToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      // logger.error(`Invalid update without required fields`)
      console.log(req.body)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'first_officer' or 'captain'`
        }
      })
    }

    // const error = getBookmarkValidationError(bookmarkToUpdate)

    // if (error) return res.status(400).send(error)

    PairingsService.updatePairing(
      req.app.get('db'),
      req.params.pairing_id,
      pairingToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })



module.exports = pairingsRouter