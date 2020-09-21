const { getPaginationParams } = require('../utils/public');
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
    pageSize
  }) {
    const { orderBy, offset, limit } = getPaginationParams({
      sort,
      direction,
      page,
      pageSize
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
  }
};
