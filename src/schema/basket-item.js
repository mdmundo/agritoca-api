const { Joi } = require('celebrate');

const basketItemCreateSchema = {
  body: Joi.object().keys({
    basket_id: Joi.number().required().integer().positive(),
    producer_product_id: Joi.number().required().integer().positive()
  })
};

const basketItemUpdateSchema = {
  body: Joi.object().keys({
    basket_id: Joi.number().integer().positive(),
    producer_product_id: Joi.number().integer().positive()
  })
};

module.exports = { basketItemCreateSchema, basketItemUpdateSchema };
