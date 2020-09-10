const jwt = require('jsonwebtoken');
const knex = require('../database/connection');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await knex('users').where('email', decoded.email).first();

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

const isAdmin = async (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else return res.status(401).send({ message: 'Not enough privilege' });
};

const isMod = async (req, res, next) => {
  if (req.user.is_mod || req.user.is_admin) {
    next();
  } else return res.status(401).send({ message: 'Not enough privilege' });
};

module.exports = { auth, isAdmin, isMod };
