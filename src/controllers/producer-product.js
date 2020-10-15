const sharp = require('sharp');
const { getWithoutPicture } = require('../utils/public');
const { producerProductResource } = require('../resources');

const producerProductController = {
  async read(req, res) {
    try {
      const producerProducts = await producerProductResource.getProducerProductsContaining(
        req.query
      );

      const serializedProducerProducts = producerProducts.map(
        (producerProduct) => getWithoutPicture(producerProduct)
      );

      return res.json(serializedProducerProducts);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const producerProduct = await producerProductResource.getProducerProductById(
        req.params
      );

      if (!producerProduct)
        return res.status(404).json({ message: 'Producer Product not found' });

      return res.json(getWithoutPicture(producerProduct));
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async getPicture(req, res) {
    try {
      const picture = await producerProductResource.getProducerProductPictureById(
        req.params
      );

      if (!picture) {
        return res.redirect(`/products/${req.params.id}/picture`);
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

      const isPicture = await producerProductResource.getUploadedPicture({
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
      const producerProduct = await producerProductResource.getInsertedProducerProduct(
        { body: req.body, mod: req.user.email }
      );

      return res.status(201).json(getWithoutPicture(producerProduct));
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error Creating Producer Product' });
    }
  },
  async update(req, res) {
    try {
      const producerProduct = await producerProductResource.getUpdatedProducerProduct(
        { id: req.params.id, body: req.body, mod: req.user.email }
      );

      return res.json(getWithoutPicture(producerProduct));
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error Updating Producer Product' });
    }
  },
  async delete(req, res) {
    try {
      await producerProductResource.deleteProducerProduct({
        id: req.params.id,
        mod: req.user.email
      });

      return res.send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error Removing Producer Product' });
    }
  }
};

module.exports = producerProductController;
