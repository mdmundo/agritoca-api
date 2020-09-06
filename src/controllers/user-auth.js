const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../database/connection');
const { userPrivateData } = require('./utils');

const userAuthController = {
  async authenticate(req, res) {
    try {
      // find by credentials
      const { email, password } = req.body;

      const user = await knex('users_data').where({ email }).first();

      if (!user) throw new Error();

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw new Error();

      // generate auth token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      await knex('users_auth').insert({
        token,
        user_id: user.id
      });

      // return token
      return res.json({ user: userPrivateData(user), token });
    } catch (error) {
      return res.status(400).json({ message: "Couldn't Authenticate" });
    }
  },
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
