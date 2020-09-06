const picture = require('./user-picture');
const {
  userPublic: userPublicData,
  userPrivate: userPrivateData
} = require('./user-data');

module.exports = {
  userPrivateData,
  userPublicData,
  userPicture: picture
};
