const Hashids = require('hashids/cjs');
const hashids = new Hashids('agritoca-api', 6);
const { getWithoutID, getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getAllProducers() {
    const producers = await knex('producers').orderBy('id');
    return producers;
  },
  async getProducersContaining({
    hash,
    name,
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

    const producers = await knex('producers')
      .where('name', 'ilike', `%${name ? name : ''}%`)
      .andWhere('hash', 'ilike', `%${hash ? hash : ''}%`)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
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
          mod
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
          producer_id: producer.id
        })
        .transacting(trx);
    });
    return producer;
  },
  async getUpdatedProducer({ id, body, mod }) {
    let producer;
    await knex.transaction(async (trx) => {
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
    });
    return producer;
  },
  async deleteProducer({ id, mod }) {
    await knex.transaction(async (trx) => {
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
    });
  }
};
