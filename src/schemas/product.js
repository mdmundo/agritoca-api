const { Joi } = require('celebrate');
const { getPaginationQueriesSchema } = require('../utils/public');

module.exports = {
  create: {
    body: Joi.object().keys({
      ncm: Joi.string()
        .required()
        .pattern(/^[0-9]+$/)
        .max(20),
      measure: Joi.string().required().max(255),
      description: Joi.string().required().max(255),
      is_organic: Joi.boolean()
    })
  },
  update: {
    params: {
      id: Joi.string()
        .required()
        .pattern(/^[0-9]+$/)
        .max(20)
    },
    body: Joi.object().keys({
      ncm: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20),
      measure: Joi.string().max(255),
      description: Joi.string().max(255),
      is_organic: Joi.boolean()
    })
  },
  search: {
    query: {
      description: Joi.string().max(255),
      ncm: Joi.string()
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
