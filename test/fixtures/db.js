const path = require('path');
const resetPath = path.resolve(__dirname, '../../src/database/resetters');
const knex = require('../../src/database/connection');
const jwt = require('jsonwebtoken');

// 'teverett@msn.com' id
const userOneId = 1;
const userOneToken = jwt.sign({ id: userOneId }, process.env.JWT_SECRET);
const setupAuth = async () => {
  await knex('users_auth').insert({
    token: userOneToken,
    user_id: userOneId
  });
};

const setupDatabase = async () => {
  await knex.seed.run({ directory: resetPath });
  await knex.migrate.latest();
  await knex.seed.run();
};

module.exports = { setupDatabase, setupAuth, userOneToken, userOneId };
