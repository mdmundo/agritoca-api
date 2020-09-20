const { getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getAllProducerProductsHistory() {
    const producerProductsHistory = await knex(
      'producer_products_history'
    ).orderBy('id');
    return producerProductsHistory;
  },
  async getProducerProductsHistoryContaining({
    brand,
    keywords,
    producerProductId,
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
    const producerProductsHistory = await knex('producer_products_history')
      .where('brand', 'ilike', `%${brand ? brand : ''}%`)
      .andWhere('keywords', 'like', `%${keywords ? keywords : ''}%`)
      .andWhere(
        'producer_product_id',
        '=',
        producerProductId ? producerProductId : ''
      )
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    return producerProductsHistory;
  },
  async getProducerProductHistoryById({ id }) {
    const producerProductHistory = await knex('producer_products_history')
      .where({ id })
      .first();
    return producerProductHistory;
  },
  async getProducerProductHistoryPictureById({ id }) {
    const producerProductHistory = await knex('producer_products_history')
      .where({ id })
      .first();
    return producerProductHistory.picture;
  }
};
