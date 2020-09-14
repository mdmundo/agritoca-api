const { Joi } = require('celebrate');

const product = {
  create: {
    body: Joi.object().keys({
      ncm: Joi.string()
        .required()
        .pattern(/^[0-9]+$/)
        .max(20),
      measure: Joi.string().required().max(255),
      picture: Joi.binary(),
      description: Joi.string().max(255),
      is_organic: Joi.boolean()
    })
  },
  update: {
    body: Joi.object().keys({
      ncm: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20),
      measure: Joi.string().max(255),
      picture: Joi.binary(),
      description: Joi.string().max(255),
      is_organic: Joi.boolean()
    })
  },
  search: {
    query: {
      description: Joi.string().max(255),
      ncm: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    },
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  }
};

module.exports = product;
