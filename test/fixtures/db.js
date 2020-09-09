const path = require('path');
const resetPath = path.resolve(__dirname, '../../src/database/resetters');
const knex = require('../../src/database/connection');
const jwt = require('jsonwebtoken');

const users = [
  {
    id: 1,
    token: jwt.sign({ id: 1 }, process.env.JWT_SECRET)
  },
  {
    id: 2,
    token: jwt.sign({ id: 2 }, process.env.JWT_SECRET)
  },
  {
    id: 3,
    token: jwt.sign({ id: 3 }, process.env.JWT_SECRET)
  }
];

const setupAuth = async () => {
  await knex('users_auth').insert([
    { user_id: users[0].id, token: users[0].token },
    { user_id: users[1].id, token: users[1].token },
    { user_id: users[2].id, token: users[2].token }
  ]);
};

const setupDatabase = async () => {
  await knex.seed.run({ directory: resetPath });
  await knex.migrate.latest();
  await knex.seed.run();
};

module.exports = { setupDatabase, setupAuth, users };
