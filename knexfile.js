const path = require('path');

module.exports = {
  client: 'pg',
  connection: process.env.DB_URL,
  migrations: {
    directory: path.resolve(__dirname, 'src/database/migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'src/database/seeds')
  },
  useNullAsDefault: true
};
