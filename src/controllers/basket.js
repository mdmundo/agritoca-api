const knex = require('../../database/connection');
const { basketResource } = require('../resources');
const { getWithoutPicture } = require('../utils/public');

const basketController = {
  async self(req, res) {
    try {
      const baskets = await basketResource.getAllUserBasketsContaining({
        ...req.query,
        user_id: req.user.id
      });

      return res.json(baskets);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async readById(req, res) {
    try {
      const basket = await basketResource.getBasketById({
        ...req.params,
        ...req.query,
        user_id: req.user.id
      });

      return res.json(basket);
    } catch (error) {
      return res.status(500).json({ message: 'Error on Server' });
    }
  },
  async create(req, res) {
    try {
      const basket = await basketResource.getInsertedBasket({
        body: req.body,
        user_id: req.user.id
      });

      return res.status(201).json(basket);
    } catch (error) {
      return res.status(500).json({ message: 'Error Creating Basket' });
    }
  },
  async createItem(req, res) {
    try {
      const basketItem = await basketResource.getInsertedBasketItem({
        id: req.params.id,
        body: req.body,
        user_id: req.user.id
      });

      return res.status(201).json(basketItem);
    } catch (error) {
      return res.status(500).json({ message: 'Error Creating Basket Item' });
    }
  },
  async update(req, res) {
    try {
      const basket = await basketResource.getUpdatedBasket({
        id: req.params.id,
        body: req.body,
        user_id: req.user.id
      });

      return res.json(basket);
    } catch (error) {
      return res.status(500).json({ message: 'Error Updating Basket' });
    }
  },
  async deleteAll(req, res) {
    try {
      await basketResource.deleteAllBaskets({
        user_id: req.user.id
      });
      return res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error Removing All Baskets' });
    }
  },
  async delete(req, res) {
    try {
      await basketResource.deleteBasket({
        id: req.params.id,
        user_id: req.user.id
      });
      return res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error Removing Basket' });
    }
  },
  async deleteItem(req, res) {
    try {
      await basketResource.deleteBasketItem({
        id: req.params.id,
        user_id: req.user.id
      });
      return res.send();
    } catch (error) {
      return res.status(500).json({ message: 'Error Removing Basket Item' });
    }
  }
};

module.exports = basketController;
