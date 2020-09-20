const { getWithoutPicture } = require('../utils/public');
const { productsHistoryResource } = require('../resources');

module.exports = {
  async read(req, res) {
    try {
      const productsHistory = await productsHistoryResource.getProductsHistoryContaining(
        req.query
      );

      const serializedProductsHistory = productsHistory.map((productHistory) =>
        getWithoutPicture(productHistory)
      );

      return res.json(serializedProductsHistory);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const productHistory = await productsHistoryResource.getProductHistoryById(
        req.params
      );
      return res.json(getWithoutPicture(productHistory));
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  }
};
