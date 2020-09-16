const axios = require('axios');
const knex = require('../../database/connection');

module.exports = {
  getAllUsers: async () => {
    const users = await knex('users').orderBy('id');
    return users;
  },
  getUsersContainingEmailOrName: async ({ name, email }) => {
    const users = await knex('users')
      .where('name', 'ilike', `%${name ? name : ''}%`)
      .andWhere('email', 'ilike', `%${email ? email : ''}%`)
      .orderBy('id');
    return users;
  },
  getUserById: async (id) => {
    const [user] = await knex('users').where({ id });
    return user;
  },
  getGoogleUserProfile: async (tokenId) => {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`
    );
    return data;
  },
  getUpdatedUser: async ({ name, email, picture }) => {
    const [user] = await knex('users')
      .where({ email })
      .first()
      .update({ name, picture, updated_at: knex.fn.now() })
      .returning('*');
    return user;
  },
  getInsertedUser: async ({ name, email, picture }) => {
    const [user] = await knex('users')
      .insert({ name, email, picture })
      .returning('*');
    return user;
  },
  setPrivilegeById: async ({ id, privilege }) => {
    await knex('users')
      .where({ id })
      .first()
      .update({ privilege, updated_at: knex.fn.now() });
  },
  deleteCurrentUser: async (id) => {
    await knex('users').del().where({ id });
  }
};
