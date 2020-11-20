const { Joi } = require('celebrate');
const { getSortingSchema } = require('../utils/public');

module.exports = {
  create: {
    body: Joi.object().keys({
      ncm: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20),
      measure: Joi.string().max(255),
      description: Joi.string().max(255),
      is_organic: Joi.boolean()
    })
  },
  update: {
    params: {
      id: Joi.number().integer().positive()
    },
    body: Joi.object().keys({
      ncm: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20),
      measure: Joi.string().max(255),
      description: Joi.string().max(255),
      is_organic: Joi.boolean(),
      owner: Joi.string().max(255)
    })
  },
  search: {
    query: {
      search: Joi.string().max(255),
      picture: Joi.any().valid('base64'),
      ...getSortingSchema()
    },
    params: {
      id: Joi.number().integer().positive()
    }
  },
  delete: {
    params: {
      id: Joi.number().integer().positive()
    }
  }
};
