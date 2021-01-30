const EmployeesService = {
  getAllEmployees(knex) {
    return knex.select('*').from('employees')
  },
  getById(knex, employee_id) {
    return knex
      .from('employees')
      .select('*')
      .where('employee_number', employee_id)
      .first()
  },
}

module.exports = EmployeesService