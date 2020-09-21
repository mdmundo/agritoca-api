const { Joi } = require('celebrate');
const { getPaginationQueriesSchema } = require('../utils/public');

module.exports = {
  search: {
    query: {
      description: Joi.string().max(255),
      ncm: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20),
      product_id: Joi.string()
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
