const jwt = require('jsonwebtoken');
const { getUserPublicProfile } = require('../utils/public');
const { userResource } = require('../resources');

const userController = {
  async read(req, res) {
    // check if is admin

    try {
      const users = await userResource.getUsersContaining(req.query);

      const serializedUsers = users.map((user) =>
        getUserPublicProfile({ user, host: req.headers.host })
      );
      return res.json(serializedUsers);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const user = await userResource.getUserById({ id: req.params.id });

      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(getUserPublicProfile({ user, host: req.headers.host }));
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
        } = await userResource.getGoogleUserProfile({
          tokenId: req.body.tokenId
        });

        // is the user already on db?
        {
          const user = await userResource.getUpdatedUser({
            name,
            email,
            picture
          });
          if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return res.json({
              user: getUserPublicProfile({ user, host: req.headers.host }),
              token
            });
          }
        }

        // Create a new user
        const user = await userResource.getInsertedUser({
          name,
          email,
          picture
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return res.status(201).json({
          user: getUserPublicProfile({ user, host: req.headers.host }),
          token
        });
      }
      return res
        .status(400)
        .json({ message: 'Error on Signing User (Bad Form)' });
    } catch (error) {
      if (error.message === 'Request failed with status code 400')
        return res.status(400).json({ message: 'Error on token validation' });
      return res.status(500).json({ message: 'Error on Signing User' });
    }
  },
  async self(req, res) {
    return res.json(
      getUserPublicProfile({ user: req.user, host: req.headers.host })
    );
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
      return res.status(500).json({ message: 'Error on Setting Privilege' });
    }
  },
  async unsetPrivilege(req, res) {
    // check if is admin
    try {
      await userResource.setPrivilegeById({ id: req.params.id, privilege: 0 });

      return res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error on Setting Privilege' });
    }
  },
  async delete(req, res) {
    try {
      // delete user by id
      // cascade configured on migrations
      await userResource.deleteCurrentUser({ id: req.user.id });

      // return user
      res.json(
        getUserPublicProfile({ user: req.user, host: req.headers.host })
      );
    } catch (error) {
      res.status(500).json({ message: 'Error Deleting User' });
    }
  }
};

module.exports = userController;
