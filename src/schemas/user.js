const { Joi } = require('celebrate');
const { getPaginationQueriesSchema } = require('../utils/public');

module.exports = {
  sign: {
    body: Joi.object().keys({
      token_id: Joi.string()
    })
  },
  search: {
    query: {
      name: Joi.string().max(255),
      email: Joi.string().max(255),
      ...getPaginationQueriesSchema()
    },
    params: {
      id: Joi.number().integer().positive(),
      privilege: Joi.string().pattern(/^(mod|admin)$/)
    }
  }
};
