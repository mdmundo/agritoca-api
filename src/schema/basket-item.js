const { Joi } = require('celebrate');

const basketItem = {
  createSchema: {
    body: Joi.object().keys({
      basket_id: Joi.number().required().integer().positive(),
      producer_product_id: Joi.number().required().integer().positive()
    })
  },
  updateSchema: {
    body: Joi.object().keys({
      basket_id: Joi.number().integer().positive(),
      producer_product_id: Joi.number().integer().positive()
    })
  }
};

module.exports = basketItem;
