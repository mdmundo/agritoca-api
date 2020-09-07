const knex = require('../database/connection');

const producerController = {
  async all(req, res) {
    // return all producers
    // search queries (byHash)

    try {
      const producers = await knex('producers').select('*');

      return res.json(producers);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async byId(req, res) {},
  async create(req, res) {
    // auth
    // check if is mod or admin
  },
  async update(req, res) {
    // auth
    // check if is mod or admin
  },
  async remove(req, res) {
    // auth
    // check if is mod or admin
  }
};

module.exports = producerController;
