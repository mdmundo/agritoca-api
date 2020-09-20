const { Joi } = require('celebrate');
const { getPaginationQueriesSchema } = require('../utils/public');

module.exports = {
  search: {
    query: {
      name: Joi.string().max(255),
      hash: Joi.string().alphanum().max(6),
      producerId: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20),
      ...getPaginationQueriesSchema()
    },
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  }
};
