module.exports = {
  getUserPublicProfile: ({ user, host }) => ({
    ...user,
    password: undefined,
    picture: user.picture ? user.picture : `${host}/users/avatar.png`
  }),
  getWithoutPicture: (item) => ({
    ...item,
    picture: undefined
  }),
  getWithoutID: (item) => ({
    ...item,
    id: undefined
  })
};
