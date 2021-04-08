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
  updatePairing(knex, id, newPairingFields) {
    return knex('pairings')
      .where({ id })
      .update(newPairingFields)
  }
}

module.exports = PairingsService