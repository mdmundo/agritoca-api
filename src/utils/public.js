const Hashids = require('hashids/cjs');
const hashids = new Hashids('agritoca-api', 6);

module.exports = {
  getUserPublicProfile: ({ user, host }) => {
    delete user.password;
    user.picture = user.picture ? user.picture : `${host}/users/avatar.png`;
    return user;
  },
  getProducerWithHash: (producer) => ({
    ...producer,
    hash: hashids.encode(producer.id)
  }),
  getProductWithoutPicture: (product) => {
    delete product.picture;
    return product;
  }
};
