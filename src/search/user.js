const Fuse = require('fuse.js');

const userSearch = ({ pattern, users }) => {
  const fuse = new Fuse(users, {
    threshold: 0.3,
    ignoreLocation: true,
    keys: ['name', 'email']
  });
  const result = fuse.search(pattern);

  const onlyUsers = result.map(({ item }) => ({ ...item }));

  return onlyUsers;
};

module.exports = userSearch;
