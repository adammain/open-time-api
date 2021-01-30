const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const { makeLayoversArray, getLayoverResponseArray } = require('./layovers-fixtures')
const { makeHotelsArray } = require('./hotels-fixtures')
const { makeEmployeesArray } = require('./Employees-fixtures')
const { makePairingsArray } = require('./pairings-fixtures')

describe('Layover Endpoints', () => {
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

  describe(`GET /api/layovers`, () => {
    context(`Given no layovers`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/layovers')
          .expect(200, [])
      })
    })

    context('Given there are layovers in the database', () => {
      const testLayovers = makeLayoversArray()
      const testHotels = makeHotelsArray()
      const testEmployees = makeEmployeesArray()
      const testPairings = makePairingsArray()
      const responseLayovers = getLayoverResponseArray()

      beforeEach('insert layovers', () => {
        return db
          .into('hotels')
          .insert(testHotels)
          .then(() => {
            return db
              .into('employees')
              .insert(testEmployees)
          })
          .then(() => {
            return db
              .into('pairings')
              .insert(testPairings)
          })
          .then(() => {
            return db
              .into('layovers')
              .insert(testLayovers)
          })
      })

      it('responds with 200 and all of the layovers', () => {
        return supertest(app)
          .get('/api/layovers')
          .expect(200, responseLayovers)
      })
    })
  })

  describe(`GET /api/layovers/:layovers_id`, () => {
    context(`Given no layovers`, () => {
      it(`responds with 404`, () => {
        const layoverId = 123456
        return supertest(app)
          .get(`/api/layovers/${layoverId}`)
          .expect(404, { error: { message: `Layover doesn't exist` } })
      })
    })

    context('Given there are layovers in the database', () => {
      const testLayovers = makeLayoversArray()
      const testHotels = makeHotelsArray()
      const testEmployees = makeEmployeesArray()
      const testPairings = makePairingsArray()
      const responseLayovers = getLayoverResponseArray()

      beforeEach('insert layovers', () => {
        return db
          .into('hotels')
          .insert(testHotels)
          .then(() => {
            return db
              .into('employees')
              .insert(testEmployees)
          })
          .then(() => {
            return db
              .into('pairings')
              .insert(testPairings)
          })
          .then(() => {
            return db
              .into('layovers')
              .insert(testLayovers)
          })
      })

      it('responds with 200 and the specified layover', () => {
        const layoverId = 2
        const expectedLayover = responseLayovers[layoverId - 1]
        return supertest(app)
          .get(`/api/layovers/${layoverId}`)
          .expect(200, expectedLayover)
      })
    })
  })
})