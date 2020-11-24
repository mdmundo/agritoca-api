const { Joi } = require('celebrate');

module.exports = {
  update: {
    body: Joi.object().keys({
      baskets: Joi.string()
    })
  }
};
