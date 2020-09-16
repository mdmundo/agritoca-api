const { Joi } = require('celebrate');

module.exports = {
  sign: {
    body: Joi.object().keys({
      tokenId: Joi.string()
    })
  },
  search: {
    query: {
      name: Joi.string().max(255),
      email: Joi.string().max(255)
    }
  }
};
