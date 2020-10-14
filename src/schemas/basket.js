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
            measure: Joi.string().max(255).empty(''),
            description: Joi.string().max(255),
            brand: Joi.string().max(255).empty(''),
            notes: Joi.string().max(255).empty('')
          })
        ),
        notes: Joi.string().max(255).empty('')
      })
    )
  }
};
