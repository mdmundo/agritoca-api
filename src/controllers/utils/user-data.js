const userPublic = ({ name, picture }) => ({ name, picture });
const userPrivate = ({ name, email, picture }) => ({ name, email, picture });

module.exports = {
  userPublic,
  userPrivate
};
