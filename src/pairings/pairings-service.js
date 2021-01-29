const PairingsService = {
  getAllPairings(knex) {
    return knex.select('*').from('pairings')
  },
  getById(knex, id) {
    return knex
      .from('pairings')
      .select('*')
      .where('id', id)
      .first()
  },
}

module.exports = PairingsService