const knex = require('../../database/connection');
const {
  getWithoutID,
  getSortingParams,
  isAdmin,
  isOwner
} = require('../utils/public');

module.exports = {
  async getProductsHistoryContaining({ product_id, sort, direction }) {
    const { orderBy } = getSortingParams({
      sort,
      direction
    });

    let productsHistory;

    if (product_id) {
      productsHistory = await knex('products_history')
        .where({ product_id })
        .orderBy(orderBy);
    } else {
      productsHistory = await knex('products_history').orderBy(orderBy);
    }

    return productsHistory;
  },
  async getProductHistoryById({ id }) {
    const productHistory = await knex('products_history').where({ id }).first();
    return productHistory;
  },
  async getProductHistoryPictureById({ id }) {
    const productHistory = await knex('products_history').where({ id }).first();
    return productHistory.picture;
  },
  async getRestoredProduct({ id, mod, privilege }) {
    let product;
    await knex.transaction(async (trx) => {
      const { product_id } = await knex('products_history')
        .where({ id })
        .first()
        .transacting(trx);

      const { owner } = await knex('products')
        .where({ id: product_id })
        .first()
        .transacting(trx);

      // the mod can only restore if he is the owner or if he is admin
      if (isAdmin({ privilege }) || isOwner({ owner, mod })) {
        const productHistory = await knex('products_history')
          .where({ id })
          .first()
          .transacting(trx);

        const isProduct = await knex('products')
          .where({ id: productHistory.product_id })
          .first()
          .transacting(trx);

        productHistory.id = productHistory.product_id;
        delete productHistory.product_id;
        delete productHistory.deleted_at;

        // if there is a product, then update, else insert
        if (!!isProduct) {
          [product] = await knex('products')
            .where({ id: productHistory.id })
            .update({
              ...getWithoutID(productHistory),
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
        } else {
          [product] = await knex('products')
            .insert({
              ...productHistory,
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
        }
      } else {
        throw new Error('Not authorized');
      }
    });
    return product;
  }
};
