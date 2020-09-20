const { productsHistoryResource } = require('../resources');

module.exports = {
  async read(req, res) {
    try {
      const productsHistory = await productsHistoryResource.getProductsHistoryContaining(
        req.query
      );

      return res.json(productsHistory);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const productHistory = await productsHistoryResource.getProductHistoryById(
        req.params
      );
      return res.json(productHistory);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  }
};
