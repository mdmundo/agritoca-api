const jwt = require('jsonwebtoken');
const knex = require('../../database/connection');

module.exports = {
  auth: async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await knex('users').where('id', decoded.id).first();

      if (!user) {
        throw new Error('Nonexisting User');
      }

      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Please Authenticate' });
    }
  },
  isAdmin: async (req, res, next) => {
    if (req.user.privilege === 2) {
      next();
    } else return res.status(403).json({ message: 'Not enough privilege' });
  },
  isMod: async (req, res, next) => {
    if (req.user.privilege === 2 || req.user.privilege === 1) {
      next();
    } else return res.status(403).json({ message: 'Not enough privilege' });
  },
  assignPrivilege: async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await knex('users').where('id', decoded.id).first();

      const { privilege } = user;
      req.user = { privilege };
      next();
    } catch (error) {
      req.user = { privilege: -1 };
      next();
    }
  }
};
