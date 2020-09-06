const knex = require('../database/connection');

const productController = {
  async all(req, res) {
    try {
      const products = await knex('products').select('*');

      const serializedProducts = products.map((product) => {
        return { id: product.id, name: product.name };
      });

      return res.json(serializedProducts);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server', error });
    }
  },
  async byId(req, res) {
    try {
      const { id } = req.params;

      const product = await knex('products').where('id', id).first();

      if (!product)
        return res.status(404).json({ message: 'Product not found.' });

      const users = await knex('users_data')
        .join('users_products', 'users_data.id', '=', 'users_products.user_id')
        .where('users_products.product_id', id)
        .select('users_data.id', 'users_data.name');

      return res.json({ product, users });
    } catch (error) {
      return res.status(404).json({ message: 'Product Not Found', error });
    }
  },
  async create(req, res) {
    try {
      const product = { ...req.body };
      await knex('products').insert(product);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: 'Error Creating Product', error });
    }
  }
};

module.exports = productController;
