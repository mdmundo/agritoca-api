const knex = require('../../database/connection');

module.exports = {
  async getAllProducts() {
    const products = await knex('products').orderBy('id');
    return products;
  },
  async getProductsContaining({ description, ncm }) {
    const products = await knex('products')
      .where('description', 'ilike', `%${description ? description : ''}%`)
      .andWhere('ncm', 'like', `%${ncm ? ncm : ''}%`)
      .orderBy('id');
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
        .first()
        .update({
          picture,
          upserter,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      // id is undefined to not cause constraint issues
      await knex('products_history')
        .insert({
          ...product,
          picture,
          upserter,
          product_id: product.id,
          id: undefined
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
          ...body,
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
        .first()
        .update({
          ...body,
          upserter,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      await knex('products_history')
        .insert({
          ...body,
          upserter,
          product_id: product.id
        })
        .transacting(trx);
    });
    return product;
  },
  async deleteProduct({ id, upserter }) {
    await knex.transaction(async (trx) => {
      await knex('products').where({ id }).first().del().transacting(trx);

      await knex('products_history')
        .insert({
          upserter,
          product_id: id
        })
        .transacting(trx);
    });
  }
};
