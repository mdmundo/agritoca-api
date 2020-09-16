const { Joi } = require('celebrate');

module.exports = {
  create: {
    body: Joi.object().keys({
      basket_id: Joi.number().required().integer().positive(),
      producer_product_id: Joi.number().required().integer().positive()
    })
  },
  update: {
    body: Joi.object().keys({
      basket_id: Joi.number().integer().positive(),
      producer_product_id: Joi.number().integer().positive()
    })
  }
};
