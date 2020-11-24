const Hashids = require('hashids/cjs');
const hashids = new Hashids(process.env.SALT, 6);
const {
  getWithoutID,
  getSortingParams,
  isOwner,
  isAdmin
} = require('../utils/public');
const knex = require('../../database/connection');
const { producerSearch } = require('../search');

module.exports = {
  async getAllProducers({ search, hash, sort, direction }) {
    if (hash) {
      const producers = await knex('producers').where({ hash });

      return producers;
    }

    const { orderBy } = getSortingParams({
      sort,
      direction
    });

    const producers = await knex('producers').orderBy(orderBy);

    if (search) {
      const searchResult = producerSearch({
        pattern: search,
        producers
      });

      return searchResult;
    }

    return producers;
  },
  async getProducerById({ id }) {
    const producer = await knex('producers').where({ id }).first();
    return producer;
  },
  async getInsertedProducer({ body, mod }) {
    let producer;
    await knex.transaction(async (trx) => {
      [producer] = await knex('producers')
        .insert({
          ...body,
          mod,
          owner: mod
        })
        .returning('*')
        .transacting(trx);

      [producer] = await knex('producers')
        .where({ id: producer.id })
        .update({
          hash: hashids.encode(producer.id)
        })
        .returning('*')
        .transacting(trx);

      await knex('producers_history')
        .insert({
          ...getWithoutID(producer),
          hash: producer.hash,
          mod,
          owner: mod,
          producer_id: producer.id
        })
        .transacting(trx);
    });
    return producer;
  },
  async getUpdatedProducer({ id, body, mod, privilege }) {
    let producer;
    await knex.transaction(async (trx) => {
      const { owner } = await knex('producers')
        .where({ id })
        .first()
        .transacting(trx);

      if (isAdmin({ privilege }) || isOwner({ owner, mod })) {
        [producer] = await knex('producers')
          .where({ id })
          .update({
            ...body,
            mod,
            updated_at: knex.fn.now()
          })
          .returning('*')
          .transacting(trx);

        await knex('producers_history')
          .insert({
            ...getWithoutID(producer),
            mod,
            producer_id: producer.id
          })
          .transacting(trx);
      } else {
        throw new Error('Not authorized');
      }
    });
    return producer;
  },
  async deleteProducer({ id, mod, privilege }) {
    await knex.transaction(async (trx) => {
      const { owner } = await knex('producers')
        .where({ id })
        .first()
        .transacting(trx);

      if (isAdmin({ privilege }) || isOwner({ owner, mod })) {
        const producerProducts = await knex('producer_products')
          .where({ producer_id: id })
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

        const [producer] = await knex('producers')
          .where({ id })
          .returning('*')
          .del()
          .transacting(trx);

        await knex('producers_history')
          .insert({
            ...getWithoutID(producer),
            mod,
            producer_id: producer.id,
            deleted_at: knex.fn.now()
          })
          .transacting(trx);
      } else {
        throw new Error('Not authorized');
      }
    });
  }
};
