const { Joi } = require('celebrate');
const { getPaginationQueriesSchema } = require('../utils/public');

module.exports = {
  create: {
    body: Joi.object().keys({
      user_id: Joi.number().required().integer().positive(),
      name: Joi.string().max(255)
    })
  },
  update: {
    body: Joi.object().keys({
      user_id: Joi.number().integer().positive(),
      name: Joi.string().max(255)
    })
  },
  search: {
    query: {
      ...getPaginationQueriesSchema()
    },
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  }
};
