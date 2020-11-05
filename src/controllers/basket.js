const { basketResource } = require('../resources');

const basketController = {
  async self(req, res) {
    try {
      const baskets = await basketResource.getAllUserBaskets({
        user_id: req.user.id
      });

      return res.json(baskets);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async update(req, res) {
    try {
      const baskets = await basketResource.getUpdatedBasket({
        body: req.body,
        user_id: req.user.id
      });

      return res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  }
};

module.exports = basketController;
