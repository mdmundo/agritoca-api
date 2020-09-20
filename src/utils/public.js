const { Joi } = require('celebrate');

module.exports = {
  getUserPublicProfile: ({ user, host }) => ({
    ...user,
    password: undefined,
    picture: user.picture ? user.picture : `${host}/users/avatar.png`
  }),
  getWithoutPicture: (item) => ({
    ...item,
    picture: undefined
  }),
  getWithoutID: (item) => ({
    ...item,
    id: undefined
  }),
  getPaginationParams: ({
    sort = 'id',
    direction = 'asc',
    page = 0,
    pageSize = 30
  }) => ({
    orderBy: [{ column: sort, order: direction }, 'id'],
    offset: pageSize * page,
    limit: pageSize
  }),
  getPaginationQueriesSchema: () => ({
    sort: Joi.string().max(63),
    direction: Joi.string()
      .max(4)
      .pattern(/^(a|de)sc$/),
    page: Joi.string()
      .pattern(/^[0-9]+$/)
      .max(6),
    pageSize: Joi.string()
      .pattern(/^[0-9]+$/)
      .max(3)
  })
};
