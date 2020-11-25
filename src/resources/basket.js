const knex = require('../../database/connection');

module.exports = {
  async getAllUserBaskets({ user_id }) {
    const { user_baskets: baskets } = await knex('baskets')
      .where({ user_id })
      .orderBy('id')
      .first();

    return { baskets };
  },
  async getUpdatedBasket({ user_id, body }) {
    // check if the user has baskets
    const isBaskets = await knex('baskets').where({ user_id });

    // Refresh db if there is some baskets
    if (isBaskets.length > 0) {
      const baskets = await knex('baskets')
        .where({ user_id })
        .update({
          user_baskets: body.baskets,
          updated_at: knex.fn.now()
        })
        .returning('*');

      return baskets;
    }

    // Insert new baskets if there is no baskets
    const baskets = await knex('baskets')
      .insert({ user_baskets: body.baskets, user_id })
      .returning('*');

    return baskets;
  }
};
