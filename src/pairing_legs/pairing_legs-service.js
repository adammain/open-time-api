const PairingLegsService = {
  getAllPairingLegs(knex) {
    return knex.select('*').from('pairing_legs')
  },
  getById(knex, id) {
    return knex
      .from('pairing_legs')
      .select('*')
      .where('id', id)
      .first()
  },
}

module.exports = PairingLegsService