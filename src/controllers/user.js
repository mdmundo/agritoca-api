const jwt = require('jsonwebtoken');
const axios = require('axios');
const knex = require('../../database/connection');
const { getUserWithoutPassword } = require('../utils/public');
const userResource = require('../resources/user');

const userController = {
  async read(req, res) {
    // check if is admin

    try {
      const { email, name } = req.query;
      const users = await userResource.getUsersContainingEmailOrName({
        name,
        email
      });

      const serializedUsers = users.map((user) => getUserWithoutPassword(user));
      return res.json(serializedUsers);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async readById(req, res) {
    try {
      const user = await userResource.getUserById(req.params.id);

      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(getUserWithoutPassword(user));
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Error on Finding an User by Id' });
    }
  },
  async sign(req, res) {
    try {
      // is Google authentication?
      if (req.body.tokenId) {
        const {
          name,
          email,
          picture
        } = await userResource.getGoogleUserProfile(req.body.tokenId);

        // is the user already on db?
        {
          const user = await userResource.getUpdatedUser({
            name,
            email,
            picture
          });
          if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return res.json({ user: getUserWithoutPassword(user), token });
          }
        }

        // Create a new user
        const user = await userResource.getInsertedUser({
          name,
          email,
          picture
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return res
          .status(201)
          .json({ user: getUserWithoutPassword(user), token });
      }
      // Create a new anonymous user
      const user = await userResource.getInsertedUser({});
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return res
        .status(201)
        .json({ user: getUserWithoutPassword(user), token });
    } catch (error) {
      return res.status(500).json({ message: 'Error on Signing User', error });
    }
  },
  async self(req, res) {
    return res.json(getUserWithoutPassword(req.user));
  },
  async setPrivilege(req, res) {
    // check if is admin
    try {
      if (req.params.privilege === 'admin') {
        await userResource.setPrivilegeById({
          id: req.params.id,
          privilege: 2
        });
        return res.send();
      }

      if (req.params.privilege === 'mod') {
        await userResource.setPrivilegeById({
          id: req.params.id,
          privilege: 1
        });
        return res.send();
      }
      return res.status(400).json({ message: 'Missing parameter' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error on Setting Privilege', error });
    }
  },
  async unsetPrivilege(req, res) {
    // check if is admin
    try {
      await userResource.setPrivilegeById({ id: req.params.id, privilege: 0 });

      return res.send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error on Setting Privilege', error });
    }
  },
  async delete(req, res) {
    try {
      // delete user by id
      // cascade configured on migrations
      await userResource.deleteCurrentUser(req.user.id);

      // return user
      res.json(getUserWithoutPassword(req.user));
    } catch (error) {
      res.status(500).json({ message: 'Error Deleting User', error });
    }
  }
};

module.exports = userController;
