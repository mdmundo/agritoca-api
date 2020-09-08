const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../database/connection');
const { publicUser } = require('../utils/public');

const userController = {
  async all(req, res) {
    // check if is admin

    try {
      const users = await knex('users').select('*');

      const serializedUsers = users.map((user) => publicUser(user));

      return res.json(serializedUsers);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async self(req, res) {},
  async create(req, res) {},
  async update(req, res) {},
  async remove(req, res) {}
};

module.exports = userController;
