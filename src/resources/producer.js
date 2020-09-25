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
  async getInsertedProducer({ body, upserter }) {
    let producer;
    await knex.transaction(async (trx) => {
      [producer] = await knex('producers')
        .insert({
          ...body,
          upserter
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
          upserter,
          producer_id: producer.id
        })
        .transacting(trx);
    });
    return producer;
  },
  async getUpdatedProducer({ id, body, upserter }) {
    let producer;
    await knex.transaction(async (trx) => {
      [producer] = await knex('producers')
        .where({ id })
        .update({
          ...body,
          upserter,
          updated_at: knex.fn.now()
        })
        .returning('*')
        .transacting(trx);

      await knex('producers_history')
        .insert({
          ...getWithoutID(producer),
          upserter,
          producer_id: producer.id
        })
        .transacting(trx);
    });
    return producer;
  },
  async deleteProducer({ id, upserter }) {
    await knex.transaction(async (trx) => {
      const [producer] = await knex('producers')
        .where({ id })
        .returning('*')
        .del()
        .transacting(trx);

      await knex('producers_history')
        .insert({
          upserter,
          producer_id: producer.id
        })
        .transacting(trx);
    });
  }
};
