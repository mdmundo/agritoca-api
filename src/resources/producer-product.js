const { getWithoutID, getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getAllProducerProducts() {
    const producerProducts = await knex('producer_products').orderBy('id');
    return producerProducts;
  },
  async getProducerProductsContaining({
    producer_id,
    product_id,
    brand,
    keywords,
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

    const producerProducts = await knex
      .select(
        'products.ncm',
        'products.measure',
        'products.description',
        'products.is_organic',
        'producer_products.*'
      )
      .from('producer_products')
      .join('products', 'products.id', 'producer_products.product_id')
      .whereRaw(
        'cast(producer_id as varchar) like ? and cast(product_id as varchar) like ?',
        [
          producer_id ? `${producer_id}` : '%',
          product_id ? `${product_id}` : '%'
        ]
      )
      .andWhere('brand', 'ilike', `%${brand ? brand : ''}%`)
      .andWhere('keywords', 'ilike', `%${keywords ? keywords : ''}%`)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    return producerProducts;
  },
  async getProducerProductById({ id }) {
    const producerProduct = await knex
      .select(
        'products.ncm',
        'products.measure',
        'products.description',
        'products.is_organic',
        'producer_products.*'
      )
      .from('producer_products')
      .join('products', 'products.id', 'producer_products.product_id')
      .where('producer_products.id', id)
      .first();
    return producerProduct;
  },
  async getProducerProductPictureById({ id }) {
    const producerProduct = await knex('producer_products')
      .where({ id })
      .first();
    return producerProduct.picture;
  },
  async getUploadedPicture({ id, picture, mod }) {
    let isPicture;
    await knex.transaction(async (trx) => {
      const [producerProduct] = await knex('producer_products')
        .where({ id })
        .update({
          picture,
          mod,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      await knex('producer_products_history')
        .insert({
          ...getWithoutID(producerProduct),
          picture,
          mod,
          producer_product_id: producerProduct.id
        })
        .transacting(trx);

      isPicture = !!producerProduct.picture;
    });
    return isPicture;
  },
  async getInsertedProducerProduct({ body, mod }) {
    let producerProduct;
    await knex.transaction(async (trx) => {
      [producerProduct] = await knex('producer_products')
        .insert({ ...body, mod })
        .returning('*')
        .transacting(trx);

      await knex('producer_products_history')
        .insert({
          ...getWithoutID(producerProduct),
          mod,
          producer_product_id: producerProduct.id
        })
        .transacting(trx);
    });
    return producerProduct;
  },
  async getUpdatedProducerProduct({ id, body, mod }) {
    let producerProduct;
    await knex.transaction(async (trx) => {
      [producerProduct] = await knex('producer_products')
        .where({ id })
        .update({
          ...body,
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
    });
    return producerProduct;
  },
  async deleteProducerProduct({ id, mod }) {
    await knex.transaction(async (trx) => {
      const [producerProduct] = await knex('producer_products')
        .where({ id })
        .returning('*')
        .del()
        .transacting(trx);

      await knex('producer_products_history')
        .insert({
          ...getWithoutID(producerProduct),
          mod,
          producer_product_id: producerProduct.id,
          deleted_at: knex.fn.now()
        })
        .transacting(trx);
    });
  }
};
