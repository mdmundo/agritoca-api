const axios = require('axios');
const knex = require('../../database/connection');

module.exports = {
  async getAllUsers() {
    const users = await knex('users').orderBy('id');
    return users;
  },
  async getUsersContaining({ name, email }) {
    const users = await knex('users')
      .where('name', 'ilike', `%${name ? name : ''}%`)
      .andWhere('email', 'ilike', `%${email ? email : ''}%`)
      .orderBy('id');
    return users;
  },
  async getUserById({ id }) {
    const user = await knex('users').where({ id }).first();
    return user;
  },
  async getGoogleUserProfile({ tokenId }) {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`
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
