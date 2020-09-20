const { getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getAllProductsHistory() {
    const productsHistory = await knex('products_history').orderBy('id');
    return productsHistory;
  },
  async getProductsHistoryContaining({
    productId,
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
        productId ? `${productId}` : '%'
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
