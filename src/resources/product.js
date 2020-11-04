const { getWithoutID, getSortingParams } = require('../utils/public');
const knex = require('../../database/connection');
const { productSearch } = require('../search');

module.exports = {
  async getAllProducts({ search, sort, direction }) {
    const { orderBy } = getSortingParams({
      sort,
      direction
    });

    const products = await knex('products').orderBy(orderBy);

    if (search) {
      const searchResult = productSearch({
        pattern: search,
        products
      });

      return searchResult;
    }

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
