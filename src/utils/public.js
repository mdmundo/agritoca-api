const Hashids = require('hashids/cjs');
const hashids = new Hashids('agritoca-api', 6);

const publicUser = (user) => {
  delete user.password;
  return user;
};

const publicProducer = (producer) => ({
  ...producer,
  hash: hashids.encode(producer.id)
});

const publicProduct = (product) => {
  delete product.picture;
  return product;
};

module.exports = {
  publicUser,
  publicProducer,
  publicProduct
};
