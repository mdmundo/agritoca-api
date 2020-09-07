const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../database/connection');

const userController = {
  async all(req, res) {
    // check if is admin
  },
  async self(req, res) {},
  async create(req, res) {},
  async update(req, res) {},
  async remove(req, res) {}
};

module.exports = userController;
