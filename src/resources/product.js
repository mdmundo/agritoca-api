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
  async getUploadedPicture({ id, picture, mod }) {
    let isPicture;
    await knex.transaction(async (trx) => {
      const [product] = await knex('products')
        .where({ id })
        .update({
          picture,
          mod,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      await knex('products_history')
        .insert({
          ...getWithoutID(product),
          picture,
          mod,
          product_id: product.id
        })
        .transacting(trx);

      isPicture = !!product.picture;
    });
    return isPicture;
  },
  async getInsertedProduct({ body, mod }) {
    let product;
    await knex.transaction(async (trx) => {
      [product] = await knex('products')
        .insert({ ...body, mod })
        .returning('*')
        .transacting(trx);

      await knex('products_history')
        .insert({
          ...getWithoutID(product),
          mod,
          product_id: product.id
        })
        .transacting(trx);
    });
    return product;
  },
  async getUpdatedProduct({ id, body, mod }) {
    let product;
    await knex.transaction(async (trx) => {
      [product] = await knex('products')
        .where({ id })
        .update({
          ...body,
          mod,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      await knex('products_history')
        .insert({
          ...getWithoutID(product),
          mod,
          product_id: product.id
        })
        .transacting(trx);
    });
    return product;
  },
  async deleteProduct({ id, mod }) {
    await knex.transaction(async (trx) => {
      const producerProducts = await knex('producer_products')
        .where({ product_id: id })
        .returning('*')
        .del()
        .transacting(trx);

      const producerProductsHistory = producerProducts.map(
        (producerProduct) => ({
          ...getWithoutID(producerProduct),
          mod,
          producer_product_id: producerProduct.id,
          deleted_at: knex.fn.now()
        })
      );

      await knex('producer_products_history')
        .insert(producerProductsHistory)
        .transacting(trx);

      const [product] = await knex('products')
        .where({ id })
        .returning('*')
        .del()
        .transacting(trx);

      await knex('products_history')
        .insert({
          ...getWithoutID(product),
          mod,
          product_id: product.id,
          deleted_at: knex.fn.now()
        })
        .transacting(trx);
    });
  }
};
