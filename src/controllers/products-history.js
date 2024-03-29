const { encode } = require('base64-arraybuffer');
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

      if (!productHistory)
        return res.status(404).json({ message: 'Product not found' });

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

      if (req.query.picture) {
        const base64 = encode(picture);
        return res.json({ picture: `data:image/png;base64,${base64}` });
      }

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
        mod: req.user.email,
        privilege: req.user.privilege
      });

      return res.json(getWithoutPicture(product));
    } catch (error) {
      return res.status(500).json({ message: 'Error on Restoring Product' });
    }
  }
};
