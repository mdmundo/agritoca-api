const { Joi } = require('celebrate');

module.exports = {
  update: {
    body: Joi.array().items(
      Joi.object({
        id: Joi.string().uuid(),
        name: Joi.string().max(255),
        items: Joi.array().items(
          Joi.object().keys({
            id: Joi.string().uuid(),
            ncm: Joi.string()
              .required()
              .pattern(/^[0-9]+$/)
              .max(20),
            measure: Joi.string().max(255),
            description: Joi.string().max(255),
            is_organic: Joi.boolean(),
            producer_product_id: Joi.number().integer().positive(),
            product_id: Joi.number().integer().positive(),
            producer_id: Joi.number().integer().positive(),
            brand: Joi.string().max(255),
            barcode: Joi.string()
              .required()
              .pattern(/^[0-9]+$/)
              .max(20),
            keywords: Joi.string().max(255),
            created_at: Joi.string().max(255),
            updated_at: Joi.string().max(255)
          })
        )
      })
    )
  }
};
