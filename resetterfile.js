const path = require('path');

module.exports = {
  client: 'pg',
  connection: process.env.DB_URL,
  seeds: {
    directory: path.resolve(__dirname, 'src/database/resetters')
  }
};
