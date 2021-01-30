const path = require('path')
const express = require('express')
const xss = require('xss')
const PairingLegsService = require('./pairing_legs-service')

const pairingLegsRouter = express.Router()
const jsonParser = express.json()

const serializePairingLegs = pairingLeg => ({
  id: pairingLeg.id,
  flight_number: pairingLeg.flight_number,
  departure_time: pairingLeg.departure_time,
  arrival_time: pairingLeg.arrival_time,
  block: pairingLeg.block,
  departure_service: pairingLeg.departure_service,
  arrival_service: pairingLeg.arrival_service,
  pairing_id: pairingLeg.pairing_id,
  deadhead_duration: pairingLeg.deadhead_duration,
  layover: pairingLeg.layover
})

pairingLegsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PairingLegsService.getAllPairingLegs(knexInstance)
      .then(pairingLegs => {
        res.json(pairingLegs.map(serializePairingLegs))
      })
      .catch(next)
  })

  pairingLegsRouter
  .route('/:pairing_leg_id')
  .all((req, res, next) => {
    PairingLegsService.getById(
      req.app.get('db'),
      req.params.pairing_leg_id
    )
      .then(pairingLeg => {
        if (!pairingLeg) {
          return res.status(404).json({
            error: { message: `Pairing Leg doesn't exist` }
          })
        }
        res.pairingLeg = pairingLeg
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializePairingLegs(res.pairingLeg))
  })



module.exports = pairingLegsRouter