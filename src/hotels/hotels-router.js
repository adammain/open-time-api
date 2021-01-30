const path = require('path')
const express = require('express')
const xss = require('xss')
const HotelsService = require('./hotels-service')

const hotelsRouter = express.Router()
const jsonParser = express.json()

const serializeHotels = hotel => ({
  id: hotel.id,
  name: hotel.name,
  phone: hotel.phone
})

hotelsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    HotelsService.getAllHotels(knexInstance)
      .then(hotels => {
        res.json(hotels.map(serializeHotels))
      })
      .catch(next)
  })

  hotelsRouter
  .route('/:hotel_id')
  .all((req, res, next) => {
    HotelsService.getById(
      req.app.get('db'),
      req.params.hotel_id
    )
      .then(hotel => {
        if (!hotel) {
          return res.status(404).json({
            error: { message: `Hotel doesn't exist` }
          })
        }
        res.hotel = hotel
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeHotels(res.hotel))
  })



module.exports = hotelsRouter