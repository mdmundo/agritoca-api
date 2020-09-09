const knex = require('../database/connection');
const sharp = require('sharp');
const { publicProduct } = require('../utils/public');

const productController = {
  async all(req, res) {
    // pagination
    // search queries

    try {
      if (req.query.description || req.query.ncm) {
        const products = await knex('products')
          .where(
            'description',
            'ilike',
            `%${req.query.description ? req.query.description : ''}%`
          )
          .andWhere('ncm', 'like', `%${req.query.ncm ? req.query.ncm : ''}%`)
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

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 1600, height: 400 })
      .png()
      .toBuffer();

    await knex('products')
      .where('id', req.params.id)
      .first()
      .update({ picture: buffer });

    res.send();
  },
  async create(req, res) {
    // check if is mod or admin
    try {
      const [product] = await knex('products').insert(req.body).returning('*');
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: 'Error Creating Product', error });
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

module.exports = productController;
