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
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20),
      privilege: Joi.string().pattern(/^(mod|admin)$/)
    }
  }
};
