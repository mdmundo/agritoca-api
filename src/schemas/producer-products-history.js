const { Joi } = require('celebrate');
const { getSortingSchema } = require('../utils/public');

module.exports = {
  search: {
    query: {
      brand: Joi.string().max(255),
      keywords: Joi.string().max(255),
      producer_product_id: Joi.number().integer().positive(),
      producer_id: Joi.number().integer().positive(),
      product_id: Joi.number().integer().positive(),
      ...getSortingSchema()
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
