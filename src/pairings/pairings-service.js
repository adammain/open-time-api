const PairingsService = {
  getAllPairings(knex) {
    return knex.select('*').from('pairings')
  }
}

module.exports = PairingsService