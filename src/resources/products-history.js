const { getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getAllProductsHistory() {
    const productsHistory = await knex('products_history').orderBy('id');
    return productsHistory;
  },
  async getProductsHistoryContaining({
    description,
    ncm,
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
      .where('description', 'ilike', `%${description ? description : ''}%`)
      .andWhere('ncm', 'like', `%${ncm ? ncm : ''}%`)
      .andWhere('product_id', '=', productId ? productId : '')
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
