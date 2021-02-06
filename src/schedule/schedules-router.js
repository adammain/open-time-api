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

schedulesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    SchedulesService.getAllSchedules(knexInstance)
      .then(schedule => {
        res.json(schedule.map(serializeSchedule))
      })
      .catch(next)
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