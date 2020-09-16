const knex = require('knex');
const path = require('path');

const knexfilePath = path.resolve(__dirname, '../knexfile');
const knexfile = require(knexfilePath);
const configOptions = knexfile;

module.exports = knex(configOptions);
