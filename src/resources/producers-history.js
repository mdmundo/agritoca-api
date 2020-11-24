const {
  getWithoutID,
  getSortingParams,
  isAdmin,
  isOwner
} = require('../utils/public');
const knex = require('../../database/connection');

module.exports = {
  async getProducersHistoryContaining({ producer_id, sort, direction }) {
    const { orderBy } = getSortingParams({
      sort,
      direction
    });

    let producersHistory;

    if (producer_id) {
      producersHistory = await knex('producers_history')
        .where({ producer_id })
        .orderBy(orderBy);
    } else {
      producersHistory = await knex('producers_history').orderBy(orderBy);
    }

    return producersHistory;
  },
  async getProducerHistoryById({ id }) {
    const producerHistory = await knex('producers_history')
      .where({ id })
      .first();
    return producerHistory;
  },
  async getRestoredProducer({ id, mod, privilege }) {
    let producer;

    await knex.transaction(async (trx) => {
      const { producer_id } = await knex('producers_history')
        .where({ id })
        .first()
        .transacting(trx);

      const { owner } = await knex('producers')
        .where({ id: producer_id })
        .first()
        .transacting(trx);

      // the mod can only restore if he is the owner or if he is admin
      if (isAdmin({ privilege }) || isOwner({ owner, mod })) {
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
      } else {
        throw new Error('Not authorized');
      }
    });
    return producer;
  }
};
