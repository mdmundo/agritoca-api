const { getWithoutID, getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getAllUserBaskets({ user_id }) {
    const baskets = await knex('baskets').where({ user_id }).orderBy('id');
    return baskets;
  },
  async getAllUserBasketsContaining({
    name,
    user_id,
    sort,
    direction,
    page,
    pageSize
  }) {
    const { orderBy, offset, limit } = getPaginationParams({
      sort,
      direction,
      page,
      pageSize
    });

    const baskets = await knex('baskets')
      .where('name', 'ilike', `%${name ? name : ''}%`)
      .andWhere({ user_id })
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    return baskets;
  },
  async getBasketById({ user_id, id, sort, direction, page, pageSize }) {
    const { orderBy, offset, limit } = getPaginationParams({
      sort,
      direction,
      page,
      pageSize
    });

    const basket = await knex('baskets').where({ user_id, id }).first();

    // const items = await knex('basket_items')
    //   .where({
    //     basket_id: basket.id
    //   })
    //   .orderBy(orderBy)
    //   .limit(limit)
    //   .offset(offset);

    const items = await knex
      .select(
        'basket_items.*',
        'producer_products.brand',
        'products.description'
      )
      .from('basket_items')
      .join(
        'producer_products',
        'producer_products.id',
        'basket_items.producer_product_id'
      )
      .join('products', 'products.id', 'producer_products.product_id')
      .where('basket_items.basket_id', '=', basket.id);

    return items;
  },
  async getInsertedBasket({ user_id, body }) {
    const [basket] = await knex('baskets')
      .insert({ ...body, user_id })
      .returning('*');
    return basket;
  },
  async getInsertedBasketItem({ user_id, id, body }) {
    let basketItem;
    await knex.transaction(async (trx) => {
      const basket = await knex('baskets').where({ user_id, id }).first();

      [basketItem] = await knex('basket_items')
        .insert({ ...body, basket_id: basket.id })
        .returning('*')
        .transacting(trx);
    });
    return basketItem;
  },
  async getUpdatedBasket({ user_id, id, body }) {
    const [basket] = await knex('baskets')
      .where({ user_id, id })
      .update({
        ...body,
        updated_at: knex.fn.now()
      })
      .returning('*');
    return basket;
  },
  async deleteAllBaskets({ user_id }) {
    await knex('baskets').where({ user_id }).del();
  },
  async deleteBasket({ user_id, id }) {
    await knex('baskets').where({ user_id, id }).del();
  },
  async deleteBasketItem({ user_id, id }) {
    await knex.transaction(async (trx) => {
      const basketItem = await knex('basket_items')
        .where({ id })
        .first()
        .transacting(trx);

      const basket = await knex('baskets')
        .where({ id: basketItem.basket_id })
        .first()
        .transacting(trx);

      if (user_id === basket.user_id)
        await knex('basket_items').where({ id }).del().transacting(trx);
    });
  }
};
