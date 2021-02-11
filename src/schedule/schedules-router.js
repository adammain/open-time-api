const path = require('path')
const express = require('express')
const xss = require('xss')
const SchedulesService = require('./schedules-service')

const schedulesRouter = express.Router()
const jsonParser = express.json()

const serializeSchedule = schedule => ({
  id: parseInt(schedule.id),
  month: schedule.month,
  days_in_month: schedule.days_in_month
})

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

schedulesRouter
  .route('/')
  .get((req, res, next) => {
    const empId = req.query.id
    const knexInstance = req.app.get('db')

    if (empId) {
      SchedulesService.getEmployeeSchedule(knexInstance, empId)
      .then(schedule => {
        res.json(schedule.map(serializePairing))
      })
      .catch(next)
    } else {
      SchedulesService.getAllSchedules(knexInstance)
      .then(schedule => {
        res.json(schedule.map(serializeSchedule))
      })
      .catch(next)
    }
  })

schedulesRouter
  .route('/:schedule_id')
  .all((req, res, next) => {
    SchedulesService.getById(
      req.app.get('db'),
      req.params.schedule_id
    )
      .then(schedule => {
        if (!schedule) {
          return res.status(404).json({
            error: { message: `Schedule doesn't exist` }
          })
        }
        res.schedule = schedule
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeSchedule(res.schedule))
  })



module.exports = schedulesRouter