const { getWithoutID, getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getAllProducerProductsHistory() {
    const producerProductsHistory = await knex(
      'producer_products_history'
    ).orderBy('id');
    return producerProductsHistory;
  },
  async getProducerProductsHistoryContaining({
    producer_product_id,
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
      .whereRaw('cast(producer_product_id as varchar) like ?', [
        producer_product_id ? `${producer_product_id}` : '%'
      ])
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
  },
  async getRestoredProducerProduct({ id, upserter }) {
    let producerProduct;
    await knex.transaction(async (trx) => {
      const producerProductHistory = await knex('producer_products_history')
        .where({ id })
        .first()
        .transacting(trx);

      const isProducerProduct = await knex('producer_products')
        .where({ id: producerProductHistory.producer_product_id })
        .first()
        .transacting(trx);

      producerProductHistory.id = producerProductHistory.producer_product_id;
      delete producerProductHistory.producer_product_id;

      // if there is a producerProduct, then update, else insert
      if (!!isProducerProduct) {
        [producerProduct] = await knex('producer_products')
          .where({ id: producerProductHistory.id })
          .update({
            ...getWithoutID(producerProductHistory),
            upserter,
            updated_at: knex.fn.now()
          })
          .returning('*')
          .transacting(trx);

        await knex('producer_products_history')
          .insert({
            ...getWithoutID(producerProduct),
            upserter,
            producer_product_id: producerProduct.id
          })
          .transacting(trx);
      } else {
        [producerProduct] = await knex('producer_products')
          .insert({
            ...producerProductHistory,
            upserter,
            updated_at: knex.fn.now()
          })
          .returning('*')
          .transacting(trx);

        await knex('producer_products_history')
          .insert({
            ...getWithoutID(producerProduct),
            upserter,
            producer_product_id: producerProduct.id
          })
          .transacting(trx);
      }
    });
    return producerProduct;
  }
};
