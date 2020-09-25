const { getWithoutID, getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getAllProducts() {
    const products = await knex('products').orderBy('id');
    return products;
  },
  async getProductsContaining({
    description,
    ncm,
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
    const products = await knex('products')
      .where('description', 'ilike', `%${description ? description : ''}%`)
      .andWhere('ncm', 'like', `%${ncm ? ncm : ''}%`)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    return products;
  },
  async getProductById({ id }) {
    const product = await knex('products').where({ id }).first();
    return product;
  },
  async getProductPictureById({ id }) {
    const product = await knex('products').where({ id }).first();
    return product.picture;
  },
  async getUploadedPicture({ id, picture, upserter }) {
    let isPicture;
    await knex.transaction(async (trx) => {
      const [product] = await knex('products')
        .where({ id })
        .update({
          picture,
          upserter,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      await knex('products_history')
        .insert({
          ...getWithoutID(product),
          picture,
          upserter,
          product_id: product.id
        })
        .transacting(trx);

      isPicture = !!product.picture;
    });
    return isPicture;
  },
  async getInsertedProduct({ body, upserter }) {
    let product;
    await knex.transaction(async (trx) => {
      [product] = await knex('products')
        .insert({ ...body, upserter })
        .returning('*')
        .transacting(trx);

      await knex('products_history')
        .insert({
          ...getWithoutID(product),
          upserter,
          product_id: product.id
        })
        .transacting(trx);
    });
    return product;
  },
  async getUpdatedProduct({ id, body, upserter }) {
    let product;
    await knex.transaction(async (trx) => {
      [product] = await knex('products')
        .where({ id })
        .update({
          ...body,
          upserter,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      await knex('products_history')
        .insert({
          ...getWithoutID(product),
          upserter,
          product_id: product.id
        })
        .transacting(trx);
    });
    return product;
  },
  async deleteProduct({ id, upserter }) {
    await knex.transaction(async (trx) => {
      const [product] = await knex('products')
        .where({ id })
        .returning('*')
        .del()
        .transacting(trx);

      await knex('products_history')
        .insert({
          upserter,
          product_id: product.id
        })
        .transacting(trx);
    });
  }
};
