const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const { makePairingLegsArray, getPairingLegsResponseArray } = require('./pairing_legs-fixtures')
const { makeHotelsArray } = require('./hotels-fixtures')
const { makeEmployeesArray } = require('./employees-fixtures')
const { makePairingsArray } = require('./pairings-fixtures')
const { makeLayoversArray } = require('./layovers-fixtures')

describe('PairingLeg Endpoints', () => {
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

  describe(`GET /api/pairing-legs`, () => {
    context(`Given no pairingLegs`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/pairing-legs')
          .expect(200, [])
      })
    })

    context('Given there are pairingLegs in the database', () => {
      const testHotels = makeHotelsArray()
      const testLayovers = makeLayoversArray()
      const testEmployees = makeEmployeesArray()
      const testPairings = makePairingsArray()
      const testPairingLegs = makePairingLegsArray()
      const responsePairingLegs = getPairingLegsResponseArray()

      beforeEach('insert pairingLegs', () => {
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
          .then(() => {
            return db
              .into('pairing_legs')
              .insert(testPairingLegs)
          })
      })

      it('responds with 200 and all of the pairingLegs', () => {
        return supertest(app)
          .get('/api/pairing-legs')
          .expect(200, responsePairingLegs)
      })
    })
  })

  describe(`GET /api/pairingLegs/:pairingLegs_id`, () => {
    context(`Given no pairingLegs`, () => {
      it(`responds with 404`, () => {
        const pairingLegId = 123456
        return supertest(app)
          .get(`/api/pairing-legs/${pairingLegId}`)
          .expect(404, { error: { message: `Pairing Leg doesn't exist` } })
      })
    })

    context('Given there are Pairing Legs in the database', () => {
      const testHotels = makeHotelsArray()
      const testLayovers = makeLayoversArray()
      const testEmployees = makeEmployeesArray()
      const testPairings = makePairingsArray()
      const testPairingLegs = makePairingLegsArray()
      const responsePairingLegs = getPairingLegsResponseArray()

      beforeEach('insert pairingLegs', () => {
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
          .then(() => {
            return db
              .into('pairing_legs')
              .insert(testPairingLegs)
          })
      })

      it('responds with 200 and the specified pairingLeg', () => {
        const pairingLegId = 2
        const expectedPairingLeg = responsePairingLegs[pairingLegId - 1]
        return supertest(app)
          .get(`/api/pairing-legs/${pairingLegId}`)
          .expect(200, expectedPairingLeg)
      })
    })
  })
})