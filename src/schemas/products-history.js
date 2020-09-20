const { Joi } = require('celebrate');

module.exports = {
  search: {
    query: {
      description: Joi.string().max(255),
      ncm: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20),
      productId: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    },
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  }
};
