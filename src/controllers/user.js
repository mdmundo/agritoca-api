const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../database/connection');
const { userPublicData, userPrivateData, userPicture } = require('./utils');

const userController = {
  async all(req, res) {
    try {
      const users = await knex('users_data').select('*');

      const serializedUsers = users.map((user) => userPublicData(user));

      return res.json(serializedUsers);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async byId(req, res) {
    try {
      const { id } = req.params;

      const user = await knex('users_data').where('id', id).first();

      if (!user) return res.status(404).json({ message: 'User not found.' });

      const products = await knex('products')
        .join('users_products', 'products.id', '=', 'users_products.product_id')
        .where('users_products.user_id', id)
        .select('products.id', 'products.name');

      return res.json({ user: userPublicData(user), products });
    } catch (error) {
      return res.status(404).json({ message: 'User Not Found', error });
    }
  },
  async self(req, res) {
    res.json(userPrivateData(req.user));
  },
  async create(req, res) {
    const user = req.body;

    // add a profile picture
    user.picture = userPicture(user);

    // encrypt password
    user.password = await bcrypt.hash(req.body.password, 8);

    try {
      const [id] = await knex('users_data').insert(user).returning('id');
      // generate auth token
      const token = jwt.sign({ id }, process.env.JWT_SECRET);
      await knex('users_auth').insert({
        token,
        user_id: id
      });

      // return user and token
      return res
        .status(201)
        .json({ user: userPrivateData({ ...user, id }), token });
    } catch (error) {
      return res.status(400).json({ message: 'Error Creating User', error });
    }
  },
  async update(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    const isUpdatingPassword = !!req.body.password;
    const isUpdatingEmail = !!req.body.email;

    // Check if is a valid update
    if (!isValidOperation)
      return res.status(400).send({ error: 'Invalid updates' });

    // Update password
    if (isUpdatingPassword)
      req.body.password = await bcrypt.hash(req.body.password, 8);

    // Update profile picture
    if (isUpdatingEmail) req.body.picture = userPicture(req.body);

    try {
      await knex('users_data').where('id', req.user.id).update(req.body);

      const user = { ...req.user, ...req.body };

      res.json(userPrivateData(user));
    } catch (error) {
      res.status(400).json({ message: 'Error Updating User', error });
    }
  },
  async remove(req, res) {
    try {
      // delete user by id
      // cascade configured on migrations
      await knex('users_data').del().where('id', req.user.id);

      // return user
      res.json(userPrivateData(req.user));
    } catch (e) {
      res.status(500).json({ message: 'Error Deleting User', error });
    }
  }
};

module.exports = userController;
