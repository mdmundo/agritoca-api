const knex = require('../../database/connection');

const producerProductController = {
  async read(req, res) {
    // pagination
    // search queries

    try {
      const producerProducts = await knex('producer_products').orderBy('id');

      return res.json(producerProducts);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async readById(req, res) {},
  async create(req, res) {
    // auth
    // check if is mod or admin
  },
  async update(req, res) {
    // auth
    // check if is mod or admin
  },
  async delete(req, res) {
    // auth
    // check if is mod or admin
  }
};

module.exports = producerProductController;
