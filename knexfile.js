const path = require('path');

module.exports = {
  client: 'pg',
  connection: {
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
  },
  migrations: {
    directory: path.resolve(__dirname, 'database/migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'database/seeds')
  },
  useNullAsDefault: false
};
