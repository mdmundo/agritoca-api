const { Joi } = require('celebrate');
const { getPaginationQueriesSchema } = require('../utils/public');

module.exports = {
  search: {
    query: {
      name: Joi.string().max(255),
      hash: Joi.string().alphanum().max(6),
      producer_id: Joi.number().integer().positive(),
      ...getPaginationQueriesSchema()
    },
    params: {
      id: Joi.number().integer().positive()
    }
  },
  restore: {
    params: {
      id: Joi.number().integer().positive()
    }
  }
};
