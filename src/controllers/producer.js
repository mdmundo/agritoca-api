const { producerResource } = require('../resources');

const producerController = {
  async read(req, res) {
    try {
      const producers = await producerResource.getAllProducers(req.query);

      return res.json(producers);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const producer = await producerResource.getProducerById(req.params);

      if (!producer)
        return res.status(404).json({ message: 'Producer not found' });

      return res.json(producer);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async create(req, res) {
    try {
      const producer = await producerResource.getInsertedProducer({
        body: req.body,
        mod: req.user.email
      });

      return res.status(201).json(producer);
    } catch (error) {
      return res.status(500).json({ message: 'Error Creating Producer' });
    }
  },
  async update(req, res) {
    try {
      const producer = await producerResource.getUpdatedProducer({
        id: req.params.id,
        body: req.body,
        mod: req.user.email
      });
      return res.json(producer);
    } catch (error) {
      return res.status(500).json({ message: 'Error Updating Producer' });
    }
  },
  async delete(req, res) {
    try {
      await producerResource.deleteProducer({
        id: req.params.id,
        mod: req.user.email
      });
      return res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error Removing Producer' });
    }
  }
};

module.exports = producerController;
