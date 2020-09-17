const sharp = require('sharp');
const { getProductWithoutPicture } = require('../utils/public');
const { productResource } = require('../resources');

const productController = {
  async read(req, res) {
    // pagination
    // search queries

    try {
      const products = await productResource.getProductsContaining(req.query);

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
      const product = await productResource.getProductById(req.params);

      return res.json(getProductWithoutPicture(product));
    } catch (error) {
      return res.status(400).json({ message: 'Malformed Request', error });
    }
  },
  async picture(req, res) {
    try {
      const picture = await productResource.getProductPictureById(req.params);

      if (!picture) {
        throw new Error();
      }

      res.set('Content-Type', 'image/png');
      res.send(picture);
    } catch (e) {
      res.status(404).send();
    }
  },
  async upload(req, res) {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 1600, height: 400 })
        .png()
        .toBuffer();

      const isPicture = await productResource.getUploadedPicture({
        id: req.params.id,
        upserter: req.user.email,
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
        upserter: req.user.email
      });

      return res.status(201).json(getProductWithoutPicture(product));
    } catch (error) {
      return res.status(400).json({ message: 'Error Creating Product', error });
    }
  },
  async update(req, res) {
    try {
      const product = await productResource.getUpdatedProduct({
        id: req.params.id,
        body: req.body,
        upserter: req.user.email
      });

      return res.status(200).json(getProductWithoutPicture(product));
    } catch (error) {
      return res.status(400).json({ message: 'Error Updating Product', error });
    }
  },
  async delete(req, res) {
    try {
      await productResource.deleteProduct({
        id: req.params.id,
        upserter: req.user.email
      });

      return res.send();
    } catch (error) {
      return res.status(400).json({ message: 'Error Removing Product', error });
    }
  }
};

module.exports = productController;
