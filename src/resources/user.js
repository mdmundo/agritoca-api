const { getSortingParams } = require('../utils/public');
const axios = require('axios');
const knex = require('../../database/connection');
const { userSearch } = require('../search');

module.exports = {
  async getAllUsers({ search, sort, direction }) {
    const { orderBy } = getSortingParams({
      sort,
      direction
    });

    const users = await knex('users').orderBy(orderBy);

    if (search) {
      const searchResult = userSearch({
        pattern: search,
        users
      });

      return searchResult;
    }

    return users;
  },
  async getUserById({ id }) {
    const user = await knex('users').where({ id }).first();
    return user;
  },
  async getGoogleUserProfile({ token_id }) {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token_id}`
    );
    return data;
  },
  async getUpdatedUser({ name, email, picture }) {
    const [user] = await knex('users')
      .where({ email })
      .first()
      .update({ name, picture, updated_at: knex.fn.now() })
      .returning('*');
    return user;
  },
  async getInsertedUser({ name, email, picture }) {
    const [user] = await knex('users')
      .insert({ name, email, picture })
      .returning('*');
    return user;
  },
  async setPrivilegeById({ id, privilege }) {
    await knex('users')
      .where({ id })
      .first()
      .update({ privilege, updated_at: knex.fn.now() });
  },
  async deleteCurrentUser({ id }) {
    await knex('users').del().where({ id });
  }
};
