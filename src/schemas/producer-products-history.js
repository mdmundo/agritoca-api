const { Joi } = require('celebrate');

module.exports = {
  search: {
    query: {
      brand: Joi.string().max(255),
      keywords: Joi.string().max(255),
      producerProductId: Joi.string()
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
