const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../database/connection');
const { publicUser } = require('../utils/public');

const userController = {
  async all(req, res) {
    // check if is admin

    try {
      if (req.query.id) {
        const [user] = await knex('users')
          .where('id', '=', req.query.id)
          .orderBy('id');

        return res.json(publicUser(user));
      }

      const users = await knex('users').orderBy('id');

      const serializedUsers = users.map((user) => publicUser(user));

      return res.json(serializedUsers);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async self(req, res) {},
  async create(req, res) {
    // publicUser
  },
  async setPrivilege(req, res) {
    // check if is admin
    try {
      if (req.params.privilege === 'admin') {
        await knex('users')
          .where('id', req.body.id)
          .first()
          .update({ is_admin: true });

        return res.send();
      }

      if (req.params.privilege === 'mod') {
        await knex('users')
          .where('id', req.body.id)
          .first()
          .update({ is_mod: true });

        return res.send();
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async unsetPrivilege(req, res) {
    // check if is admin
    try {
      if (req.params.privilege === 'admin') {
        await knex('users')
          .where('id', req.body.id)
          .first()
          .update({ is_admin: false });

        return res.send();
      }

      if (req.params.privilege === 'mod') {
        await knex('users')
          .where('id', req.body.id)
          .first()
          .update({ is_mod: false });

        return res.send();
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async update(req, res) {},
  async remove(req, res) {}
};

module.exports = userController;
