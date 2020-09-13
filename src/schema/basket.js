const { Joi } = require('celebrate');

const basket = {
  createSchema: {
    body: Joi.object().keys({
      user_id: Joi.number().required().integer().positive(),
      name: Joi.string().max(255)
    })
  },
  updateSchema: {
    body: Joi.object().keys({
      user_id: Joi.number().integer().positive(),
      name: Joi.string().max(255)
    })
  }
};

module.exports = basket;
