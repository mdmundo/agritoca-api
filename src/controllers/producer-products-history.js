const { encode } = require('base64-arraybuffer');
const { getWithoutPicture } = require('../utils/public');
const { producerProductsHistoryResource } = require('../resources');

module.exports = {
  async read(req, res) {
    try {
      const producerProductsHistory = await producerProductsHistoryResource.getProducerProductsHistoryContaining(
        req.query
      );

      const serializedProducerProductsHistory = producerProductsHistory.map(
        (producerProductHistory) => getWithoutPicture(producerProductHistory)
      );

      return res.json(serializedProducerProductsHistory);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const producerProductHistory = await producerProductsHistoryResource.getProducerProductHistoryById(
        req.params
      );

      if (!producerProductHistory)
        return res.status(404).json({ message: 'Producer Product not found' });

      return res.json(getWithoutPicture(producerProductHistory));
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async getPicture(req, res) {
    try {
      const picture = await producerProductsHistoryResource.getProducerProductHistoryPictureById(
        req.params
      );

      if (!picture) throw new Error();

      if (req.query.picture) {
        const base64 = encode(picture);
        return res.json({ picture: `data:image/png;base64, ${base64}` });
      }

      res.set('Content-Type', 'image/png');
      res.send(picture);
    } catch (error) {
      res.status(404).send();
    }
  },
  async restore(req, res) {
    try {
      const producerProduct = await producerProductsHistoryResource.getRestoredProducerProduct(
        {
          id: req.params.id,
          mod: req.user.email,
          privilege: req.user.privilege
        }
      );

      return res.json(getWithoutPicture(producerProduct));
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error on Restoring Producer Product' });
    }
  }
};
