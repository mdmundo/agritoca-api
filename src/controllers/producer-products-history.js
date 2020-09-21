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

      res.set('Content-Type', 'image/png');
      res.send(picture);
    } catch (e) {
      res.status(404).send();
    }
  }
};