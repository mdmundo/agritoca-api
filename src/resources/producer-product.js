const {
  getWithoutID,
  getSortingParams,
  isAdmin,
  isOwner
} = require('../utils/public');
const knex = require('../../database/connection');
const { producerProductSearch } = require('../search');

module.exports = {
  async getAllProducerProducts({
    producer_id,
    product_id,
    search,
    sort,
    direction
  }) {
    const { orderBy } = getSortingParams({
      sort,
      direction
    });

    let producerProducts = [];

    if (producer_id && product_id) {
      producerProducts = await knex
        .select(
          'products.ncm',
          'products.measure',
          'products.description',
          'products.is_organic',
          'producer_products.*'
        )
        .from('producer_products')
        .join('products', 'products.id', 'producer_products.product_id')
        .where({ producer_id, product_id })
        .orderBy(orderBy);
    } else if (producer_id || product_id) {
      if (producer_id) {
        producerProducts = await knex
          .select(
            'products.ncm',
            'products.measure',
            'products.description',
            'products.is_organic',
            'producer_products.*'
          )
          .from('producer_products')
          .join('products', 'products.id', 'producer_products.product_id')
          .where({ producer_id })
          .orderBy(orderBy);
      } else {
        producerProducts = await knex
          .select(
            'products.ncm',
            'products.measure',
            'products.description',
            'products.is_organic',
            'producer_products.*'
          )
          .from('producer_products')
          .join('products', 'products.id', 'producer_products.product_id')
          .where({ product_id })
          .orderBy(orderBy);
      }
    } else {
      producerProducts = await knex
        .select(
          'products.ncm',
          'products.measure',
          'products.description',
          'products.is_organic',
          'producer_products.*'
        )
        .from('producer_products')
        .join('products', 'products.id', 'producer_products.product_id')
        .orderBy(orderBy);
    }

    if (search) {
      const searchResult = producerProductSearch({
        pattern: search,
        producerProducts
      });

      return searchResult;
    }

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
    const { product_id, picture } = await knex('producer_products')
      .where({ id })
      .first();

    const product = await knex('products').where({ id: product_id }).first();

    const productPicture = product.picture;

    return { productPicture, picture };
  },
  async getUploadedPicture({ id, picture, mod, privilege }) {
    let isPicture;
    await knex.transaction(async (trx) => {
      const { owner } = await knex('producer_products')
        .where({ id })
        .first()
        .transacting(trx);

      if (isAdmin({ privilege }) || isOwner({ owner, mod })) {
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
      } else {
        throw new Error('Not authorized');
      }
    });
    return isPicture;
  },
  async getInsertedProducerProduct({ body, mod }) {
    let producerProduct;
    await knex.transaction(async (trx) => {
      [producerProduct] = await knex('producer_products')
        .insert({ ...body, mod, owner: mod })
        .returning('*')
        .transacting(trx);

      await knex('producer_products_history')
        .insert({
          ...getWithoutID(producerProduct),
          mod,
          owner: mod,
          producer_product_id: producerProduct.id
        })
        .transacting(trx);
    });
    return producerProduct;
  },
  async getUpdatedProducerProduct({ id, body, mod, privilege }) {
    let producerProduct;
    await knex.transaction(async (trx) => {
      const { owner } = await knex('producer_products')
        .where({ id })
        .first()
        .transacting(trx);

      if (isAdmin({ privilege }) || isOwner({ owner, mod })) {
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
      } else {
        throw new Error('Not authorized');
      }
    });
    return producerProduct;
  },
  async deleteProducerProduct({ id, mod, privilege }) {
    await knex.transaction(async (trx) => {
      const { owner } = await knex('producer_products')
        .where({ id })
        .first()
        .transacting(trx);

      if (isAdmin({ privilege }) || isOwner({ owner, mod })) {
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
      } else {
        throw new Error('Not authorized');
      }
    });
  }
};
