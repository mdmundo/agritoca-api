const { getWithoutID, getPaginationParams } = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getAllProducersHistory() {
    const producersHistory = await knex('producers_history').orderBy('id');
    return producersHistory;
  },
  async getProducersHistoryContaining({
    producer_id,
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
    const producersHistory = await knex('producers_history')
      .whereRaw(
        'cast(producer_id as varchar) like ?',
        producer_id ? `${producer_id}` : '%'
      )
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    return producersHistory;
  },
  async getProducerHistoryById({ id }) {
    const producerHistory = await knex('producers_history')
      .where({ id })
      .first();
    return producerHistory;
  },
  async getRestoredProducer({ id, mod }) {
    let producer;
    await knex.transaction(async (trx) => {
      const producerHistory = await knex('producers_history')
        .where({ id })
        .first()
        .transacting(trx);

      const isProducer = await knex('producers')
        .where({ id: producerHistory.producer_id })
        .first()
        .transacting(trx);

      producerHistory.id = producerHistory.producer_id;
      delete producerHistory.producer_id;
      delete producerHistory.deleted_at;

      // if there is a producer, then update, else insert
      if (!!isProducer) {
        [producer] = await knex('producers')
          .where({ id: producerHistory.id })
          .update({
            ...getWithoutID(producerHistory),
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
        [producer] = await knex('producers')
          .insert({
            ...producerHistory,
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
      }
    });
    return producer;
  }
};
