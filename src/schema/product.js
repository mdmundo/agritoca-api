const { Joi } = require('celebrate');

const productCreateSchema = {
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
};

const productUpdateSchema = {
  body: Joi.object().keys({
    ncm: Joi.string()
      .pattern(/^[0-9]+$/)
      .max(20),
    measure: Joi.string().max(255),
    picture: Joi.binary(),
    description: Joi.string().max(255),
    is_organic: Joi.boolean()
  })
};

const productSearchSchema = {
  query: {
    description: Joi.string().max(255),
    ncm: Joi.string()
      .pattern(/^[0-9]+$/)
      .max(20)
  }
};

module.exports = {
  productCreateSchema,
  productUpdateSchema,
  productSearchSchema
};
