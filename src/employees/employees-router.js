const path = require('path')
const express = require('express')
const xss = require('xss')
const EmployeesService = require('./employees-service')

const employeesRouter = express.Router()
const jsonParser = express.json()

const serializeEmployees = employee => ({
  employee_number: parseInt(employee.employee_number),
  crew_type: employee.crew_type,
  first_name: employee.first_name,
  last_name: employee.last_name
})

employeesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    EmployeesService.getAllEmployees(knexInstance)
      .then(employees => {
        res.json(employees.map(serializeEmployees))
      })
      .catch(next)
  })

  employeesRouter
  .route('/:employee_id')
  .all((req, res, next) => {
    EmployeesService.getById(
      req.app.get('db'),
      req.params.employee_id
    )
      .then(employee => {
        if (!employee) {
          return res.status(404).json({
            error: { message: `Employee doesn't exist` }
          })
        }
        res.employee = employee
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeEmployees(res.employee))
  })



module.exports = employeesRouter