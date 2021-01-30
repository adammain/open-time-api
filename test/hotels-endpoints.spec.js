const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const { makeHotelsArray } = require('./hotels-fixtures')

describe('Hotel Endpoints', () => {
  let db
  
  before('make knex intance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE pairing_legs, layovers, pairings, hotels, employees RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE pairing_legs, layovers, pairings, hotels, employees RESTART IDENTITY CASCADE'))

  describe(`GET /api/hotels`, () => {
    context(`Given no hotels`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/hotels')
          .expect(200, [])
      })
    })

    context('Given there are hotels in the database', () => {
      const testHotels = makeHotelsArray()

      beforeEach('insert hotels', () => {
        return db
          .into('hotels')
          .insert(testHotels)
      })

      it('responds with 200 and all of the hotels', () => {
        return supertest(app)
          .get('/api/hotels')
          .expect(200, testHotels)
      })
    })
  })

  describe(`GET /api/hotels/:hotels_id`, () => {
    context(`Given no hotels`, () => {
      it(`responds with 404`, () => {
        const hotelId = 123456
        return supertest(app)
          .get(`/api/hotels/${hotelId}`)
          .expect(404, { error: { message: `Hotel doesn't exist` } })
      })
    })

    context('Given there are hotels in the database', () => {
      const testHotels = makeHotelsArray()

      beforeEach('insert hotels', () => {
        return db
          .into('hotels')
          .insert(testHotels)
      })

      it('responds with 200 and the specified hotel', () => {
        const hotelId = 2
        const expectedHotel = testHotels[hotelId - 1]
        return supertest(app)
          .get(`/api/hotels/${hotelId}`)
          .expect(200, expectedHotel)
      })
    })
  })
})