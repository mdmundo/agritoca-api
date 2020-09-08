const { Joi } = require('celebrate');

const producerCreateSchema = {
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
};

const producerUpdateSchema = {
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
};

module.exports = { producerCreateSchema, producerUpdateSchema };
