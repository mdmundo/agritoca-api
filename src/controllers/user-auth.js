const jwt = require('jsonwebtoken');
const knex = require('../database/connection');
const { publicUser } = require('../utils/public');

const userAuthController = {
  async logout(req, res) {
    try {
      const user_id = req.user.id;
      const token = req.token;

      await knex('users_auth').del().where({ user_id, token });

      res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async logoutAll(req, res) {
    try {
      const user_id = req.user.id;

      await knex('users_auth').del().where({ user_id });

      res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  }
};

module.exports = userAuthController;
