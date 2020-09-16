const Hashids = require('hashids/cjs');
const hashids = new Hashids('agritoca-api', 6);
const knex = require('../../database/connection');
const {
  getProducerWithHash,
  getProductWithoutPicture
} = require('../utils/public');

const producerController = {
  async read(req, res) {
    // return all producers
    // search queries (byHash)

    try {
      const { hash, name } = req.query;
      if (hash) {
        const [id] = hashids.decode(hash);
        if (isNaN(id))
          return res.status(400).json({ message: 'Malformed Request' });

        const producer = await knex('producers').where({ id }).first();

        return res.json(getProducerWithHash(producer));
      }

      if (name) {
        const producers = await knex('producers')
          .where('name', 'ilike', `%${name}%`)
          .orderBy('id');

        const serializedProducers = producers.map((producer) =>
          getProducerWithHash(producer)
        );
        return res.json(serializedProducers);
      }

      const producers = await knex('producers').orderBy('id');

      serializedProducers = producers.map((producer) =>
        getProducerWithHash(producer)
      );

      return res.json(serializedProducers);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async readById(req, res) {
    // try {
    // multiple joins example
    // const products = await knex.select('*').from('producer_products').join('producers', 'producer_products.producer_id', '=', 'producers.id').join('products', 'producer_products.product_id', '=', 'products.id').where('producers.id', '=', req.params.id);
    const products = await knex('producer_products')
      .where('producer_products.producer_id', '=', req.params.id)
      .join('products', 'producer_products.product_id', '=', 'products.id');

    const serializedProducts = products.map((product) =>
      getProductWithoutPicture(product)
    );

    return res.json(serializedProducts);
    // } catch (error) {
    //   return res.status(400).json({ message: 'Malformed Request', error });
    // }
  },
  async create(req, res) {
    try {
      await knex.transaction(async (trx) => {
        const [producer] = await knex('producers')
          .insert({ ...req.body, upserter: req.user.email })
          .returning('*')
          .transacting(trx);

        await knex('producers_history')
          .insert({
            ...req.body,
            upserter: req.user.email,
            producer_id: producer.id
          })
          .transacting(trx);

        return res.status(201).json(getProducerWithHash(producer));
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Error Creating Producer', error });
    }
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
