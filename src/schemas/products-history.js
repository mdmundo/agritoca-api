const { Joi } = require('celebrate');
const { getSortingSchema } = require('../utils/public');

module.exports = {
  search: {
    query: {
      description: Joi.string().max(255),
      ncm: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20),
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
