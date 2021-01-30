const LayoversService = {
  getAllLayovers(knex) {
    return knex.select('*').from('layovers')
  },
  getById(knex, id) {
    return knex
      .from('layovers')
      .select('*')
      .where('id', id)
      .first()
  },
}

module.exports = LayoversService