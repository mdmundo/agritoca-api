const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../database/connection');

const userController = {
  async all(req, res) {
    // check if is admin
    if (req.user.is_admin) {
      try {
        const users = await knex('users').select('*');

        return res.json(users);
      } catch (error) {
        return res.status(500).json({ message: 'Error on Server', error });
      }
    }
    return res.status(401).send({ message: 'You are nothing' });
  },
  async self(req, res) {},
  async create(req, res) {},
  async update(req, res) {},
  async remove(req, res) {}
};

module.exports = userController;
