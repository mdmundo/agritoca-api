const { producerResource } = require('../resources');
const { getPublicProducer, isMod } = require('../utils/public');

const producerController = {
  async read(req, res) {
    try {
      const producers = await producerResource.getAllProducers(req.query);

      if (isMod(req.user)) return res.json(producers);

      // if user is not mod or admin, then show only public data...
      const serializedProducers = producers.map((producer) =>
        getPublicProducer(producer)
      );

      return res.json(serializedProducers);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const producer = await producerResource.getProducerById(req.params);

      if (!producer)
        return res.status(404).json({ message: 'Producer not found' });

      // if user is not mod or admin, then show only public data...
      return res.json(isMod(req.user) ? producer : getPublicProducer(producer));
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
        mod: req.user.email,
        privilege: req.user.privilege
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
        mod: req.user.email,
        privilege: req.user.privilege
      });
      return res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error Removing Producer' });
    }
  }
};

module.exports = producerController;
