const {
  getWithoutID,
  getSortingParams,
  isAdmin,
  isOwner
} = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getProducerProductsHistoryContaining({
    producer_product_id,
    producer_id,
    product_id,
    sort,
    direction
  }) {
    const { orderBy } = getSortingParams({
      sort,
      direction
    });

    let producerProductsHistory = [];

    if (producer_product_id && producer_id && product_id) {
      producerProductsHistory = await knex('producer_products_history')
        .where({ producer_product_id, producer_id, product_id })
        .orderBy(orderBy);
    } else if (producer_product_id && producer_id && !product_id) {
      producerProductsHistory = await knex('producer_products_history')
        .where({ producer_product_id, producer_id })
        .orderBy(orderBy);
    } else if (producer_product_id && !producer_id && product_id) {
      producerProductsHistory = await knex('producer_products_history')
        .where({ producer_product_id, product_id })
        .orderBy(orderBy);
    } else if (producer_product_id && !producer_id && !product_id) {
      producerProductsHistory = await knex('producer_products_history')
        .where({ producer_product_id })
        .orderBy(orderBy);
    } else if (!producer_product_id && producer_id && product_id) {
      producerProductsHistory = await knex('producer_products_history')
        .where({ producer_id, product_id })
        .orderBy(orderBy);
    } else if (!producer_product_id && producer_id && !product_id) {
      producerProductsHistory = await knex('producer_products_history')
        .where({ producer_id })
        .orderBy(orderBy);
    } else if (!producer_product_id && !producer_id && product_id) {
      producerProductsHistory = await knex('producer_products_history')
        .where({ product_id })
        .orderBy(orderBy);
    } else if (!producer_product_id && !producer_id && !product_id) {
      producerProductsHistory = await knex('producer_products_history').orderBy(
        orderBy
      );
    }

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
  async getRestoredProducerProduct({ id, mod, privilege }) {
    let producerProduct;
    await knex.transaction(async (trx) => {
      const { owner } = await knex('producer_products_history')
        .where({ id })
        .first()
        .transacting(trx);

      // the mod can only restore if he was the owner or if he is admin
      if (isAdmin({ privilege }) || isOwner({ owner, mod })) {
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
      } else {
        throw new Error('Not authorized');
      }
    });
    return producerProduct;
  }
};
