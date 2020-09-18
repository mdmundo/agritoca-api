module.exports = {
  getUserPublicProfile: ({ user, host }) => {
    delete user.password;
    user.picture = user.picture ? user.picture : `${host}/users/avatar.png`;
    return user;
  },
  getProductWithoutPicture: (product) => {
    delete product.picture;
    return product;
  }
};
