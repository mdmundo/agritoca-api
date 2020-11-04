const knex = require('../../database/connection');
const jwt = require('jsonwebtoken');

const users = [
  { id: 1, token: jwt.sign({ id: 1 }, process.env.JWT_SECRET) },
  { id: 2, token: jwt.sign({ id: 2 }, process.env.JWT_SECRET) },
  { id: 3, token: jwt.sign({ id: 3 }, process.env.JWT_SECRET) }
];

const setupDatabase = async () => {
  await knex.migrate.rollback({}, true);
  await knex.migrate.latest();
  await knex.seed.run();
};

const teardownConnection = async () => {
  await knex.destroy();
};

module.exports = {
  setupDatabase,
  teardownConnection,
  users
};
