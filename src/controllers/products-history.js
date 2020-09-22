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
  },
  async getPicture(req, res) {
    try {
      const picture = await productsHistoryResource.getProductHistoryPictureById(
        req.params
      );

      if (!picture) throw new Error();

      res.set('Content-Type', 'image/png');
      res.send(picture);
    } catch (error) {
      res.status(404).send();
    }
  },
  async restore(req, res) {
    try {
      const product = await productsHistoryResource.getRestoredProduct({
        id: req.params.id,
        upserter: req.user.email
      });

      return res.json(getWithoutPicture(product));
    } catch (error) {
      return res.status(500).json({ message: 'Error on Restoring Product' });
    }
  }
};
