const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../database/connection');

const userAuthController = {
  async authenticate(req, res) {},
  async logout(req, res) {},
  async logoutAll(req, res) {}
};

module.exports = userAuthController;
