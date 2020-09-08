const { Joi } = require('celebrate');

const createSchema = {
  body: Joi.object().keys({
    basket_id: Joi.number().required().integer().positive(),
    producer_product_id: Joi.number().required().integer().positive()
  })
};

const updateSchema = {
  body: Joi.object().keys({
    basket_id: Joi.number().integer().positive(),
    producer_product_id: Joi.number().integer().positive()
  })
};

module.exports = { createSchema, updateSchema };
