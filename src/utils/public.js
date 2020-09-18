module.exports = {
  getUserPublicProfile: ({ user, host }) => {
    delete user.password;
    user.picture = user.picture ? user.picture : `${host}/users/avatar.png`;
    return user;
  },
  getWithoutPicture: (item) => {
    delete item.picture;
    return item;
  }
};
