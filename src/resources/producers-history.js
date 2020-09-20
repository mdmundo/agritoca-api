const knex = require('../../database/connection');

module.exports = {
  async getAllProducersHistory() {
    const producersHistory = await knex('producers_history').orderBy('id');
    return producersHistory;
  },
  async getProducersHistoryContaining({ hash, name, producerId }) {
    const producersHistory = await knex('producers_history')
      .where('name', 'ilike', `%${name ? name : ''}%`)
      .andWhere('hash', 'ilike', `%${hash ? hash : ''}%`)
      .andWhere('producer_id', '=', producerId ? producerId : '')
      .orderBy('id');
    return producersHistory;
  },
  async getProducerHistoryById({ id }) {
    const producerHistory = await knex('producers_history')
      .where({ id })
      .first();
    return producerHistory;
  }
};
