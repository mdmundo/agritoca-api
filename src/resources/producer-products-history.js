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
    producer_id,
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
    const producerProductsHistory = await knex('producer_products_history')
      .whereRaw('cast(producer_product_id as varchar) like ?', [
        producer_product_id ? `${producer_product_id}` : '%'
      ])
      .whereRaw('cast(producer_id as varchar) like ?', [
        producer_id ? `${producer_id}` : '%'
      ])
      .whereRaw('cast(product_id as varchar) like ?', [
        product_id ? `${product_id}` : '%'
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
  async getRestoredProducerProduct({ id, mod }) {
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
      delete producerProductHistory.deleted_at;

      // if there is a producerProduct, then update, else insert
      if (!!isProducerProduct) {
        [producerProduct] = await knex('producer_products')
          .where({ id: producerProductHistory.id })
          .update({
            ...getWithoutID(producerProductHistory),
            mod,
            updated_at: knex.fn.now()
          })
          .returning('*')
          .transacting(trx);

        await knex('producer_products_history')
          .insert({
            ...getWithoutID(producerProduct),
            mod,
            producer_product_id: producerProduct.id
          })
          .transacting(trx);
      } else {
        [producerProduct] = await knex('producer_products')
          .insert({
            ...producerProductHistory,
            mod,
            updated_at: knex.fn.now()
          })
          .returning('*')
          .transacting(trx);

        await knex('producer_products_history')
          .insert({
            ...getWithoutID(producerProduct),
            mod,
            producer_product_id: producerProduct.id
          })
          .transacting(trx);
      }
    });
    return producerProduct;
  }
};
