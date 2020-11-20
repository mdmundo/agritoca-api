const { Joi } = require('celebrate');
const { getSortingSchema } = require('../utils/public');

module.exports = {
  create: {
    body: Joi.object().keys({
      product_id: Joi.number().required().integer().positive(),
      producer_id: Joi.number().required().integer().positive(),
      brand: Joi.string().max(255),
      barcode: Joi.string().max(255),
      keywords: Joi.string().max(255),
      info: Joi.string().max(255)
    })
  },
  update: {
    params: {
      id: Joi.number().integer().positive()
    },
    body: Joi.object().keys({
      product_id: Joi.number().integer().positive(),
      producer_id: Joi.number().integer().positive(),
      brand: Joi.string().max(255),
      barcode: Joi.string().max(255),
      keywords: Joi.string().max(255),
      info: Joi.string().max(255)
    })
  },
  search: {
    query: {
      search: Joi.string().max(255),
      producer_id: Joi.number().integer().positive(),
      product_id: Joi.number().integer().positive(),
      picture: Joi.any().valid('base64'),
      ...getSortingSchema()
    },
    params: {
      id: Joi.number().integer().positive()
    }
  },
  delete: {
    params: {
      id: Joi.number().integer().positive()
    }
  }
};
