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
      const producerHistory = await producersHistoryResource.getProducerHistoryById(
        req.params
      );

      if (!producerHistory)
        return res.status(404).json({ message: 'Producer not found' });

      return res.json(producerHistory);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async restore(req, res) {
    try {
      const producer = await producersHistoryResource.getRestoredProducer({
        id: req.params.id,
        mod: req.user.email
      });

      return res.json(producer);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Restoring Producer' });
    }
  }
};
