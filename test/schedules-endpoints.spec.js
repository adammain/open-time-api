const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const { makeSchedulesArray } = require('./schedules-fixtures')

describe('Schedule Endpoints', () => {
  let db
  
  before('make knex intance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
      seeds: {
        directory: '../seeds/seed.pairings.sql'
      }
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE pairing_legs, layovers, pairings, hotels, employees, schedules RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE pairing_legs, layovers, pairings, hotels, employees, schedules RESTART IDENTITY CASCADE'))

  describe(`GET /api/schedules`, () => {
    context(`Given no schedules`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/schedules')
          .expect(200, [])
      })
    })

    context('Given there are schedules in the database', () => {
      const testSchedules = makeSchedulesArray()

      beforeEach('insert schedules', () => {
        return db
          .into('schedules')
          .insert(testSchedules)
      })

      it('responds with 200 and all of the schedules', () => {
        return supertest(app)
          .get('/api/schedules')
          .expect(200, testSchedules)
      })
    })
  })

  describe(`GET /api/schedules/:schedules_id`, () => {
    context(`Given no schedules`, () => {
      it(`responds with 404`, () => {
        const scheduleId = 123456
        return supertest(app)
          .get(`/api/schedules/${scheduleId}`)
          .expect(404, { error: { message: `Schedule doesn't exist` } })
      })
    })

    context('Given there are schedules in the database', () => {
      const testSchedules = makeSchedulesArray()

      beforeEach('insert schedules', () => {
        return db
          .into('schedules')
          .insert(testSchedules)
      })

      it('responds with 200 and the specified schedule', () => {
        const scheduleId = 1
        const expectedSchedule = testSchedules[scheduleId - 1]
        return supertest(app)
          .get(`/api/schedules/${scheduleId}`)
          .expect(200, expectedSchedule)
      })
    })
  })

  // @TODO: Add /api/schedules/:empId endpoint test
})