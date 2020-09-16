const path = require('path');

module.exports = {
  client: 'pg',
  connection: process.env.DB_URL,
  migrations: {
    directory: path.resolve(__dirname, 'database/migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'database/seeds')
  },
  useNullAsDefault: false
};
