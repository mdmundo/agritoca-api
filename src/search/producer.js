const Fuse = require('fuse.js');

const producerSearch = ({ pattern, producers }) => {
  const fuse = new Fuse(producers, {
    threshold: 0.3,
    ignoreLocation: true,
    keys: ['hash', 'name']
  });
  const result = fuse.search(pattern);

  const onlyProducers = result.map(({ item }) => ({ ...item }));

  return onlyProducers;
};

module.exports = producerSearch;
