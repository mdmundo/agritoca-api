const knex = require('../database/connection');

const producerController = {
  async all(req, res) {
    // return all producers
  },
  async byHash(req, res) {
    // return all producer data and products
  },
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
