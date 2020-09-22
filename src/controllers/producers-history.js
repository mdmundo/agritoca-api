const { producersHistoryResource } = require('../resources');

module.exports = {
  async read(req, res) {
    try {
      const producersHistory = await producersHistoryResource.getProducersHistoryContaining(
        req.query
      );

      return res.json(producersHistory);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const productHistory = await producersHistoryResource.getProducerHistoryById(
        req.params
      );
      return res.json(productHistory);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async restore(req, res) {
    try {
      const producer = await producersHistoryResource.getRestoredProducer({
        id: req.params.id,
        upserter: req.user.email
      });

      return res.json(producer);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Restoring Producer' });
    }
  }
};
