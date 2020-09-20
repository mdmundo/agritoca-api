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
    producerProductId
  }) {
    const producerProductsHistory = await knex('producer_products_history')
      .where('brand', 'ilike', `%${brand ? brand : ''}%`)
      .andWhere('keywords', 'like', `%${keywords ? keywords : ''}%`)
      .andWhere(
        'producer_product_id',
        '=',
        producerProductId ? producerProductId : ''
      )
      .orderBy('id');
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
