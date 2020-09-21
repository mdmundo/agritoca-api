const { Joi } = require('celebrate');
const { getPaginationQueriesSchema } = require('../utils/public');

module.exports = {
  search: {
    query: {
      brand: Joi.string().max(255),
      keywords: Joi.string().max(255),
      producer_product_id: Joi.string()
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
