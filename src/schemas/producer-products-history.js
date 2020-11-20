const { Joi } = require('celebrate');
const { getSortingSchema } = require('../utils/public');

module.exports = {
  search: {
    query: {
      producer_product_id: Joi.number().integer().positive(),
      producer_id: Joi.number().integer().positive(),
      product_id: Joi.number().integer().positive(),
      picture: Joi.any().valid('base64'),
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
