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
  async self(req, res) {
    return res.json(publicUser(req.user));
  },
  async create(req, res) {
    const password = await bcrypt.hash(req.body.password, 8);

    try {
      const [user] = await knex('users')
        .insert({ ...req.body, password })
        .returning('*');
      // generate auth token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      await knex('users_auth').insert({
        token,
        user_id: user.id
      });

      // return user and token
      return res.status(201).json({ user: publicUser(user), token });
    } catch (error) {
      return res.status(400).json({ message: 'Error Creating User', error });
    }
  },
  async setPrivilege(req, res) {
    // check if is admin
    try {
      if (req.params.privilege === 'admin') {
        await knex('users')
          .where('id', req.body.id)
          .first()
          .update({ is_admin: true, updated_at: knex.fn.now() });

        return res.send();
      }

      if (req.params.privilege === 'mod') {
        await knex('users')
          .where('id', req.body.id)
          .first()
          .update({ is_mod: true, updated_at: knex.fn.now() });

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
          .update({ is_admin: false, updated_at: knex.fn.now() });

        return res.send();
      }

      if (req.params.privilege === 'mod') {
        await knex('users')
          .where('id', req.body.id)
          .first()
          .update({ is_mod: false, updated_at: knex.fn.now() });

        return res.send();
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async update(req, res) {
    const isUpdatingPassword = !!req.body.password;

    // Update password
    if (isUpdatingPassword)
      req.body.password = await bcrypt.hash(req.body.password, 8);

    try {
      const [user] = await knex('users')
        .where('id', req.user.id)
        .update({
          ...req.body,
          updated_at: knex.fn.now()
        })
        .returning('*');

      res.json(publicUser(user));
    } catch (error) {
      res.status(400).json({ message: 'Error Updating User', error });
    }
  },
  async remove(req, res) {
    try {
      // delete user by id
      // cascade configured on migrations
      await knex('users').del().where('id', req.user.id);

      // return user
      res.json(publicUser(req.user));
    } catch (error) {
      res.status(500).json({ message: 'Error Deleting User', error });
    }
  }
};

module.exports = userController;
