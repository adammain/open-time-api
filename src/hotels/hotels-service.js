const HotelsService = {
  getAllHotels(knex) {
    return knex.select('*').from('hotels')
  },
  getById(knex, id) {
    return knex
      .from('hotels')
      .select('*')
      .where('id', id)
      .first()
  },
}

module.exports = HotelsService