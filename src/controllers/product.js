const knex = require('../../database/connection');
const sharp = require('sharp');
const { getProductWithoutPicture } = require('../utils/public');

const productController = {
  async read(req, res) {
    // pagination
    // search queries

    try {
      const { description, ncm } = req.query;
      if (description || ncm) {
        const products = await knex('products')
          .where('description', 'ilike', `%${description ? description : ''}%`)
          .andWhere('ncm', 'like', `%${ncm ? ncm : ''}%`)
          .orderBy('id');

        const serializedProducts = products.map((product) =>
          getProductWithoutPicture(product)
        );

        return res.json(serializedProducts);
      }

      const products = await knex('products').orderBy('id');

      const serializedProducts = products.map((product) =>
        getProductWithoutPicture(product)
      );

      return res.json(serializedProducts);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async readById(req, res) {
    try {
      const products = await knex('producer_products')
        .where('producer_products.product_id', '=', req.params.id)
        .join('products', 'producer_products.product_id', '=', 'products.id');

      const serializedProducts = products.map((product) =>
        getProductWithoutPicture(product)
      );

      return res.json(serializedProducts);
    } catch (error) {
      return res.status(400).json({ message: 'Malformed Request', error });
    }
  },
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
    try {
      await knex.transaction(async (trx) => {
        const [product] = await knex('products')
          .insert({ ...req.body, upserter: req.user.email })
          .returning('*')
          .transacting(trx);

        await knex('products_history')
          .insert({
            ...req.body,
            upserter: req.user.email,
            product_id: product.id
          })
          .transacting(trx);

        return res.status(201).json(getProductWithoutPicture(product));
      });
    } catch (error) {
      return res.status(400).json({ message: 'Error Creating Product', error });
    }
  },
  async update(req, res) {
    try {
      await knex.transaction(async (trx) => {
        const [product] = await knex('products')
          .where({ id: req.params.id })
          .first()
          .update({
            ...req.body,
            upserter: req.user.email,
            updated_at: knex.fn.now()
          })
          .returning('*')
          .transacting(trx);

        await knex('products_history')
          .insert({
            ...req.body,
            upserter: req.user.email,
            product_id: product.id
          })
          .transacting(trx);

        return res.status(200).json(getProductWithoutPicture(product));
      });
    } catch (error) {
      return res.status(400).json({ message: 'Error Updating Product', error });
    }
  },
  async remove(req, res) {
    try {
      await knex.transaction(async (trx) => {
        await knex('products')
          .where({ id: req.params.id })
          .first()
          .del()
          .transacting(trx);

        await knex('products_history')
          .insert({
            upserter: req.user.email,
            product_id: req.params.id
          })
          .transacting(trx);

        return res.send();
      });
    } catch (error) {
      return res.status(400).json({ message: 'Error Removing Product', error });
    }
  }
};

module.exports = productController;
