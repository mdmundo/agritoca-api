const path = require('path');
const resetPath = path.resolve(__dirname, '../../database/resetters');
const knex = require('../../database/connection');
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

const setupDatabase = async () => {
  await knex.seed.run({ directory: resetPath });
  await knex.migrate.latest();
  await knex.seed.run();
};

module.exports = { setupDatabase, users };
