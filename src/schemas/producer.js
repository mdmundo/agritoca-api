const { Joi } = require('celebrate');
const { getSortingSchema } = require('../utils/public');

module.exports = {
  create: {
    body: Joi.object().keys({
      cpf: Joi.string()
        .pattern(/^[0-9]+$/)
        .length(11),
      cnpj: Joi.string()
        .pattern(/^[0-9]+$/)
        .length(14),
      name: Joi.string().max(255),
      whatsapp: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(255),
      address: Joi.string().max(255),
      ie: Joi.string().alphanum().max(255),
      im: Joi.string().alphanum().max(255)
    })
  },
  update: {
    params: {
      id: Joi.number().integer().positive()
    },
    body: Joi.object().keys({
      cpf: Joi.string()
        .pattern(/^[0-9]+$/)
        .length(11),
      cnpj: Joi.string()
        .pattern(/^[0-9]+$/)
        .length(14),
      name: Joi.string().max(255),
      whatsapp: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(255),
      address: Joi.string().max(255),
      ie: Joi.string().alphanum().max(255),
      im: Joi.string().alphanum().max(255)
    })
  },
  search: {
    query: {
      search: Joi.string().max(255),
      hash: Joi.string().alphanum().max(6),
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
