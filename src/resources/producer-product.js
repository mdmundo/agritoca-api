const { getWithoutID, getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getAllProducerProducts() {
    const producerProducts = await knex('producer_products').orderBy('id');
    return producerProducts;
  },
  async getProducerProductsContaining({
    producerId,
    productId,
    brand,
    keywords,
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
    const producerProducts = await knex('producer_products')
      .whereRaw(
        'cast(producer_id as varchar) like ? and cast(product_id as varchar) like ?',
        [producerId ? `${producerId}` : '%', productId ? `${productId}` : '%']
      )
      .andWhere('brand', 'ilike', `%${brand ? brand : ''}%`)
      .andWhere('keywords', 'ilike', `%${keywords ? keywords : ''}%`)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    return producerProducts;
  },
  async getProducerProductById({ id }) {
    const producerProduct = await knex('producer_products')
      .where({ id })
      .first();
    return producerProduct;
  },
  async getProducerProductPictureById({ id }) {
    const producerProduct = await knex('producer_products')
      .where({ id })
      .first();
    return producerProduct.picture;
  },
  async getUploadedPicture({ id, picture, upserter }) {
    let isPicture;
    await knex.transaction(async (trx) => {
      const [producerProduct] = await knex('producer_products')
        .where({ id })
        .update({
          picture,
          upserter,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      await knex('producer_products_history')
        .insert({
          ...getWithoutID(producerProduct),
          picture,
          upserter,
          producer_product_id: producerProduct.id
        })
        .transacting(trx);

      isPicture = !!producerProduct.picture;
    });
    return isPicture;
  },
  async getInsertedProducerProduct({ body, upserter }) {
    let producerProduct;
    await knex.transaction(async (trx) => {
      [producerProduct] = await knex('producer_products')
        .insert({ ...body, upserter })
        .returning('*')
        .transacting(trx);

      await knex('producer_products_history')
        .insert({
          ...getWithoutID(producerProduct),
          upserter,
          producer_product_id: producerProduct.id
        })
        .transacting(trx);
    });
    return producerProduct;
  },
  async getUpdatedProducerProduct({ id, body, upserter }) {
    let producerProduct;
    await knex.transaction(async (trx) => {
      [producerProduct] = await knex('producer_products')
        .where({ id })
        .update({
          ...body,
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
    });
    return producerProduct;
  },
  async deleteProducerProduct({ id, upserter }) {
    await knex.transaction(async (trx) => {
      const [producerProduct] = await knex('producer_products')
        .where({ id })
        .returning('*')
        .del()
        .transacting(trx);

      await knex('producer_products_history')
        .insert({
          upserter,
          producer_product_id: producerProduct.id
        })
        .transacting(trx);
    });
  }
};
