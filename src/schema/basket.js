const { Joi } = require('celebrate');

module.exports = {
  create: {
    body: Joi.object().keys({
      user_id: Joi.number().required().integer().positive(),
      name: Joi.string().max(255)
    })
  },
  update: {
    body: Joi.object().keys({
      user_id: Joi.number().integer().positive(),
      name: Joi.string().max(255)
    })
  }
};
