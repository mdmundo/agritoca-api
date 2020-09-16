const Hashids = require('hashids/cjs');
const hashids = new Hashids('agritoca-api', 6);

const getUserWithoutPassword = (user) => {
  delete user.password;
  return user;
};

const getProducerWithHash = (producer) => ({
  ...producer,
  hash: hashids.encode(producer.id)
});

const getProductWithoutPicture = (product) => {
  delete product.picture;
  return product;
};

module.exports = {
  getUserWithoutPassword,
  getProducerWithHash,
  getProductWithoutPicture
};
