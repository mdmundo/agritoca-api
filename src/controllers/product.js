const knex = require('../database/connection');
const sharp = require('sharp');
const { publicProduct } = require('../utils/public');

const productController = {
  async all(req, res) {
    // pagination
    // search queries

    try {
      const products = await knex('products').select('*');

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

    await knex('products')
      .where('id', req.params.id)
      .update({ picture: buffer });

    res.send();
  },
  async create(req, res) {
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

module.exports = productController;
