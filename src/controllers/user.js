const jwt = require('jsonwebtoken');
const axios = require('axios');
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
  async sign(req, res) {
    try {
      // is Google authentication?
      if (req.body.tokenId) {
        const {
          data: { name, email, picture }
        } = await axios.get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.tokenId}`
        );

        // is the user already on db?
        const user = await knex('users').where({ email }).first();
        if (user) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          return res.json({ user: publicUser(user), token });
        }

        // Create a new user
        const [newUser] = await knex('users')
          .insert({ name, email, picture })
          .returning('*');
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
        return res.status(201).json({ user: publicUser(newUser), token });
      }
      // Create a new anonymous user
      const [user] = await knex('users').insert({}).returning('*');
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return res.status(201).json({ user: publicUser(user), token });
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async self(req, res) {
    return res.json(publicUser(req.user));
  },
  async setPrivilege(req, res) {
    // check if is admin
    try {
      if (req.params.privilege === 'admin') {
        await knex('users')
          .where('id', req.body.id)
          .first()
          .update({ privilege: 2, updated_at: knex.fn.now() });

        return res.send();
      }

      if (req.params.privilege === 'mod') {
        await knex('users')
          .where('id', req.body.id)
          .first()
          .update({ privilege: 1, updated_at: knex.fn.now() });

        return res.send();
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async unsetPrivilege(req, res) {
    // check if is admin
    try {
      await knex('users')
        .where('id', req.body.id)
        .first()
        .update({ privilege: 0, updated_at: knex.fn.now() });

      return res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
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
