const knex = require('../database/connection');

const producerController = {
  async all(req, res) {
    // return all producers
    // search queries (byHash)
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
