const knex = require('../../database/connection');
const { getWithoutID, getPaginationParams } = require('../utils/public');

module.exports = {
  async getAllProductsHistory() {
    const productsHistory = await knex('products_history').orderBy('id');
    return productsHistory;
  },
  async getProductsHistoryContaining({
    product_id,
    sort,
    direction,
    page,
    pagesize
  }) {
    const { orderBy, offset, limit } = getPaginationParams({
      sort,
      direction,
      page,
      pagesize
    });
    const productsHistory = await knex('products_history')
      .whereRaw('cast(product_id as varchar) like ?', [
        product_id ? `${product_id}` : '%'
      ])
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    return productsHistory;
  },
  async getProductHistoryById({ id }) {
    const productHistory = await knex('products_history').where({ id }).first();
    return productHistory;
  },
  async getProductHistoryPictureById({ id }) {
    const productHistory = await knex('products_history').where({ id }).first();
    return productHistory.picture;
  },
  async getRestoredProduct({ id, upserter }) {
    let product;
    await knex.transaction(async (trx) => {
      const productHistory = await knex('products_history')
        .where({ id })
        .first()
        .transacting(trx);

      const isProduct = await knex('products')
        .where({ id: productHistory.product_id })
        .first()
        .transacting(trx);

      productHistory.id = productHistory.product_id;
      delete productHistory.product_id;

      // if there is a product, then update, else insert
      if (!!isProduct) {
        [product] = await knex('products')
          .where({ id: productHistory.id })
          .update({
            ...getWithoutID(productHistory),
            upserter,
            updated_at: knex.fn.now()
          })
          .returning('*')
          .transacting(trx);

        await knex('products_history')
          .insert({
            ...getWithoutID(product),
            upserter,
            product_id: product.id
          })
          .transacting(trx);
      } else {
        [product] = await knex('products')
          .insert({
            ...productHistory,
            upserter,
            updated_at: knex.fn.now()
          })
          .returning('*')
          .transacting(trx);

        await knex('products_history')
          .insert({
            ...getWithoutID(product),
            upserter,
            product_id: product.id
          })
          .transacting(trx);
      }
    });
    return product;
  }
};
