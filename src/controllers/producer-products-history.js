const { producerProductsHistoryResource } = require('../resources');

module.exports = {
  async read(req, res) {
    try {
      const producerProductsHistory = await producerProductsHistoryResource.getProducerProductsHistoryContaining(
        req.query
      );

      return res.json(producerProductsHistory);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const producerProductHistory = await producerProductsHistoryResource.getProducerProductHistoryById(
        req.params
      );
      return res.json(producerProductHistory);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  }
};
