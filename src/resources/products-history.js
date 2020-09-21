const { getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

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
    pageSize
  }) {
    const { orderBy, offset, limit } = getPaginationParams({
      sort,
      direction,
      page,
      pageSize
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
  }
};
