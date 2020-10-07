const knex = require('../../database/connection');

module.exports = {
  async getAllUserBaskets({ user_id }) {
    try {
      const [{ user_baskets: baskets }] = await knex('baskets')
        .where({ user_id })
        .orderBy('id');
      return baskets;
    } catch (error) {
      return [];
    }
  },
  async getUpdatedBasket({ user_id, body }) {
    // check if the user has baskets
    const isBaskets = await knex('baskets').where({ user_id });

    // Refresh db if there is some baskets
    if (isBaskets.length > 0) {
      const baskets = await knex('baskets')
        .where({ user_id })
        .update({
          user_baskets: JSON.stringify(body),
          updated_at: knex.fn.now()
        })
        .returning('*');

      return baskets;
    }

    // Insert new baskets if there is no baskets
    const baskets = await knex('baskets')
      .insert({ user_baskets: JSON.stringify(body), user_id })
      .returning('*');

    return baskets;
  }
};
