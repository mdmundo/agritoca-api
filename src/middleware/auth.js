const jwt = require('jsonwebtoken');
const knex = require('../database/connection');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await knex('users_data')
      .join('users_auth', 'users_data.id', '=', 'users_auth.user_id')
      .where('users_data.id', decoded.id)
      .where('users_auth.token', token)
      .select('users_data.*')
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

module.exports = auth;
