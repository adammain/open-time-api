const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const { makeEmployeesArray } = require('./employees-fixtures')
const { makePairingsArray, getPairingsResponseArray } = require('./pairings-fixtures')

describe('Pairing Endpoints', () => {
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

  describe(`GET /api/pairings`, () => {
    context(`Given no pairings`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/pairings')
          .expect(200, [])
      })
    })

    context('Given there are pairings in the database', () => {
      const testEmployees = makeEmployeesArray()
      const testPairings = makePairingsArray()
      const responsePairings = getPairingsResponseArray()

      beforeEach('insert pairings', () => {
        return db
          .into('employees')
          .insert(testEmployees)
          .then(() => {
            return db
              .into('pairings')
              .insert(testPairings)
          })
      })

      it('responds with 200 and all of the pairings', () => {
        return supertest(app)
          .get('/api/pairings')
          .expect(200, responsePairings)
      })
    })
  })

  describe(`GET /api/pairings/:pairing_id`, () => {
    context(`Given no pairings`, () => {
      it(`responds with 404`, () => {
        const pairingId = 123456
        return supertest(app)
          .get(`/api/pairings/${pairingId}`)
          .expect(404, { error: { message: `Pairing doesn't exist` } })
      })
    })

    context('Given there are pairings in the database', () => {
      const testEmployees = makeEmployeesArray()
      const testPairings = makePairingsArray()
      const responsePairings = getPairingsResponseArray()

      beforeEach('insert pairings', () => {
        return db
          .into('employees')
          .insert(testEmployees)
          .then(() => {
            return db
              .into('pairings')
              .insert(testPairings)
          })
      })

      it('responds with 200 and the specified pairing', () => {
        const pairingId = 2
        const expectedPairing = responsePairings[pairingId - 1]
        return supertest(app)
          .get(`/api/pairings/${pairingId}`)
          .expect(200, expectedPairing)
      })
    })
  })
})