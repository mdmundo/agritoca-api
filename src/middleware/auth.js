const jwt = require('jsonwebtoken');
const knex = require('../database/connection');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await knex('users')
      .join('users_auth', 'users.id', '=', 'users_auth.user_id')
      .where('users.id', decoded.id)
      .where('users_auth.token', token)
      .select('users.*')
      .first();

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Please Authenticate' });
  }
};

const checkAdmin = async (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else return res.status(401).send({ message: 'Not enough privilege' });
};

const checkMod = async (req, res, next) => {
  if (req.user.is_mod || req.user.is_admin) {
    next();
  } else return res.status(401).send({ message: 'Not enough privilege' });
};

module.exports = { auth, checkAdmin, checkMod };
