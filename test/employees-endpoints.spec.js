const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const { makeEmployeesArray } = require('./employees-fixtures')

describe('Employee Endpoints', () => {
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

  describe(`GET /api/employees`, () => {
    context(`Given no employees`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/employees')
          .expect(200, [])
      })
    })

    context('Given there are employees in the database', () => {
      const testEmployees = makeEmployeesArray()

      beforeEach('insert employees', () => {
        return db
          .into('employees')
          .insert(testEmployees)
      })

      it('responds with 200 and all of the employees', () => {
        return supertest(app)
          .get('/api/employees')
          .expect(200, testEmployees)
      })
    })
  })

  describe(`GET /api/employees/:employees_id`, () => {
    context(`Given no employees`, () => {
      it(`responds with 404`, () => {
        const employeeId = 123456
        return supertest(app)
          .get(`/api/employees/${employeeId}`)
          .expect(404, { error: { message: `Employee doesn't exist` } })
      })
    })

    context('Given there are employees in the database', () => {
      const testEmployees = makeEmployeesArray()

      beforeEach('insert employees', () => {
        return db
          .into('employees')
          .insert(testEmployees)
      })

      it('responds with 200 and the specified employee', () => {
        const employeeId = 2
        const expectedEmployee = testEmployees[employeeId - 1]
        return supertest(app)
          .get(`/api/employees/${employeeId}`)
          .expect(200, expectedEmployee)
      })
    })
  })
})