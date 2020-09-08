const knex = require('../database/connection');
const sharp = require('sharp');
const { publicProduct } = require('../utils/public');
const updateUserTime = require('../utils/updates');

const productController = {
  async all(req, res) {
    // pagination
    // search queries

    try {
      if (req.query.description) {
        const products = await knex('products')
          .where('description', 'ilike', `%${req.query.description}%`)
          .orderBy('id');

        const serializedProducts = products.map((product) =>
          publicProduct(product)
        );

        return res.json(serializedProducts);
      }

      if (req.query.ncm) {
        const products = await knex('products')
          .where('ncm', 'like', `%${req.query.ncm}%`)
          .orderBy('id');

        const serializedProducts = products.map((product) =>
          publicProduct(product)
        );

        return res.json(serializedProducts);
      }

      const products = await knex('products').orderBy('id');

      const serializedProducts = products.map((product) =>
        publicProduct(product)
      );

      return res.json(serializedProducts);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async byId(req, res) {},
  async picture(req, res) {
    try {
      const product = await knex('products').where('id', req.params.id).first();

      if (!product || !product.picture) {
        throw new Error();
      }

      res.set('Content-Type', 'image/png');
      res.send(product.picture);
    } catch (e) {
      res.status(404).send();
    }
  },
  async upload(req, res) {
    // check if is mod or admin
    // save on upserter
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 1600, height: 400 })
      .png()
      .toBuffer();

    const updates = updateUserTime(req.user.email);
    await knex('products')
      .where('id', req.params.id)
      .update({ picture: buffer, ...updates });

    res.send();
  },
  async create(req, res) {
    // check if is mod or admin
    // save on upserter
    try {
      const product = await knex('products')
        .insert({ ...req.body })
        .returning('*');
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: 'Error Creating Product', error });
    }
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

module.exports = productController;
