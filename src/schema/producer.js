const { Joi } = require('celebrate');

const producer = {
  create: {
    body: Joi.object().keys({
      cpf: Joi.string()
        .required()
        .pattern(/^[0-9]+$/)
        .length(11),
      cnpj: Joi.string()
        .pattern(/^[0-9]+$/)
        .length(14),
      name: Joi.string().required().max(255),
      whatsapp: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(255),
      address: Joi.string().max(255),
      ie: Joi.string().alphanum().max(255),
      im: Joi.string().alphanum().max(255)
    })
  },
  update: {
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
      name: Joi.string().max(255)
    },
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  }
};

module.exports = producer;
