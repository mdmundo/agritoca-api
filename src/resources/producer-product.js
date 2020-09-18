const knex = require('../../database/connection');

module.exports = {
  async getAllProducerProducts() {
    const producerProducts = await knex('producer_products').orderBy('id');
    return producerProducts;
  },
  async getProducerProductsContaining({ brand, keywords }) {
    const producerProducts = await knex('producer_products')
      .where('brand', 'ilike', `%${brand ? brand : ''}%`)
      .andWhere('keywords', 'like', `%${keywords ? keywords : ''}%`)
      .orderBy('id');
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
        .first()
        .update({
          picture,
          upserter,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      // id is undefined to not cause constraint issues
      await knex('producer_products_history')
        .insert({
          ...producerProduct,
          picture,
          upserter,
          product_id: producerProduct.id,
          id: undefined
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
          ...body,
          upserter,
          product_id: producerProduct.id
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
        .first()
        .update({
          ...body,
          upserter,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      await knex('producer_products_history')
        .insert({
          ...body,
          upserter,
          product_id: producerProduct.id
        })
        .transacting(trx);
    });
    return producerProduct;
  },
  async deleteProducerProduct({ id, upserter }) {
    await knex.transaction(async (trx) => {
      await knex('producer_products')
        .where({ id })
        .first()
        .del()
        .transacting(trx);

      await knex('producer_products_history')
        .insert({
          upserter,
          product_id: id
        })
        .transacting(trx);
    });
  }
};
