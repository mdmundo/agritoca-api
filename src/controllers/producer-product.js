const knex = require('../database/connection');

const producerProductController = {
  async all(req, res) {
    // pagination
    // search queries

    try {
      const producerProducts = await knex('producer_products').orderBy('id');

      return res.json(producerProducts);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async byId(req, res) {},
  async create(req, res) {
    // auth
    // check if is mod or admin
    // save on upserter
  },
  async update(req, res) {
    // auth
    // check if is mod or admin
    // save on upserter
  },
  async remove(req, res) {
    // auth
    // check if is mod or admin
  }
};

module.exports = producerProductController;
