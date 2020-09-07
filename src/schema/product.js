const { Joi } = require('celebrate');

const productCreateSchema = {
  body: Joi.object().keys({
    ncm: Joi.string().required().max(255),
    measure: Joi.string().required().max(255),
    picture: Joi.binary(),
    description: Joi.string().max(255),
    is_organic: Joi.boolean()
  })
};

const productUpdateSchema = {
  body: Joi.object().keys({
    ncm: Joi.string().max(255),
    measure: Joi.string().max(255),
    picture: Joi.binary(),
    description: Joi.string().max(255),
    is_organic: Joi.boolean()
  })
};

module.exports = { productCreateSchema, productUpdateSchema };
