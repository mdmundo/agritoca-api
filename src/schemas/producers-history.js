const { Joi } = require('celebrate');
const { getSortingSchema } = require('../utils/public');

module.exports = {
  search: {
    query: {
      producer_id: Joi.number().integer().positive(),
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
