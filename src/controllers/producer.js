const Hashids = require('hashids/cjs');
const hashids = new Hashids('agritoca-api', 6);
const knex = require('../database/connection');
const { publicProducer } = require('../utils/public');

const producerController = {
  async all(req, res) {
    // return all producers
    // search queries (byHash)

    try {
      if (req.query.hash) {
        const [id] = hashids.decode(req.query.hash);
        const producer = await knex('producers').where('id', id).first();

        return res.json(publicProducer(producer));
      }

      const producers = await knex('producers').select('*');

      serializedProducers = producers.map((producer) =>
        publicProducer(producer)
      );

      return res.json(serializedProducers);
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
