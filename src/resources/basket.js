const knex = require('../../database/connection');

module.exports = {
  async getAllUserBaskets({ user_id }) {
    const [{ user_baskets: baskets }] = await knex('baskets')
      .where({ user_id })
      .orderBy('id');
    return baskets;
  },
  async getUpdatedBasket({ user_id, body }) {
    const baskets = await knex('baskets')
      .where({ user_id })
      .update({
        user_baskets: JSON.stringify(body),
        updated_at: knex.fn.now()
      })
      .returning('*');
    return baskets;
  }
};
