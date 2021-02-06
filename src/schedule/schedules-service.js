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
}

module.exports = SchedulesService