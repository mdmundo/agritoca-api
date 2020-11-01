const sharp = require('sharp');
const { getWithoutPicture } = require('../utils/public');
const { productResource } = require('../resources');
const { productSearch } = require('../search/product');

const productController = {
  async read(req, res) {
    try {
      if (req.query.search) {
        const products = await productResource.getAllProducts();

        const searchResult = productSearch({
          pattern: req.query.search,
          products,
          options: { keys: ['ncm', 'description'] }
        });

        const serializedProducts = searchResult.map((product) =>
          getWithoutPicture(product)
        );

        return res.json(serializedProducts);
      }

      const products = await productResource.getProductsContaining(req.query);

      const serializedProducts = products.map((product) =>
        getWithoutPicture(product)
      );

      return res.json(serializedProducts);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const product = await productResource.getProductById(req.params);

      if (!product)
        return res.status(404).json({ message: 'Product not found' });

      return res.json(getWithoutPicture(product));
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async getPicture(req, res) {
    try {
      const picture = await productResource.getProductPictureById(req.params);

      if (!picture) {
        return res.redirect('/products/picture.png');
      }

      res.set('Content-Type', 'image/png');
      res.send(picture);
    } catch (error) {
      res.status(404).send();
    }
  },
  async setPicture(req, res) {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 200, height: 200 })
        .png()
        .toBuffer();

      const isPicture = await productResource.getUploadedPicture({
        id: req.params.id,
        mod: req.user.email,
        picture: buffer
      });

      if (!isPicture) throw new Error();

      res.send();
    } catch (error) {
      res.status(500).json({ message: 'Error on Uploading Picture' });
    }
  },
  async create(req, res) {
    try {
      const product = await productResource.getInsertedProduct({
        body: req.body,
        mod: req.user.email
      });

      return res.status(201).json(getWithoutPicture(product));
    } catch (error) {
      return res.status(500).json({ message: 'Error Creating Product' });
    }
  },
  async update(req, res) {
    try {
      const product = await productResource.getUpdatedProduct({
        id: req.params.id,
        body: req.body,
        mod: req.user.email
      });

      return res.json(getWithoutPicture(product));
    } catch (error) {
      return res.status(500).json({ message: 'Error Updating Product' });
    }
  },
  async delete(req, res) {
    try {
      await productResource.deleteProduct({
        id: req.params.id,
        mod: req.user.email
      });

      return res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error Removing Product' });
    }
  }
};

module.exports = productController;
