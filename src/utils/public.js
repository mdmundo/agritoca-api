const { Joi } = require('celebrate');
const fs = require('fs');
const path = require('path');

module.exports = {
  getWithoutPicture: (item) => ({
    ...item,
    picture: undefined
  }),
  getWithoutID: (item) => ({
    ...item,
    id: undefined
  }),
  getPublicProducer: (item) => ({
    ...item,
    cpf: undefined,
    cnpj: undefined,
    hash: undefined,
    ie: undefined,
    im: undefined
  }),
  getSortingParams: ({ sort = 'id', direction = 'asc' }) => ({
    orderBy: [{ column: sort, order: direction }, 'id']
  }),
  getSortingSchema: () => ({
    sort: Joi.string().max(63),
    direction: Joi.string()
      .max(4)
      .pattern(/^(a|de)sc$/)
  }),
  getDefaultPicture: fs.readFileSync(path.join(__dirname, 'picture.png')),
  isMod: ({ privilege }) => privilege === 1 || privilege === 2,
  isAdmin: ({ privilege }) => privilege === 2,
  isOwner: ({ owner, mod }) => owner === mod
};
