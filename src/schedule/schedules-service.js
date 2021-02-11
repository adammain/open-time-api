const SchedulesService = {
  getAllSchedules(knex) {
    return knex.select('*').from('schedules')
  },
  getById(knex, schedule_id) {
    return knex
      .from('schedules')
      .select('*')
      .where('id', schedule_id)
      .first()
  },
  getEmployeeSchedule(knex, emp_id) {
    return knex
      .from('pairings')
      .select('*')
      .where('first_officer', emp_id)
  }
}

module.exports = SchedulesService