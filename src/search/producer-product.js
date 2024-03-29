const Fuse = require('fuse.js');

const producerProductSearch = ({ pattern, producerProducts }) => {
  const fuse = new Fuse(producerProducts, {
    threshold: 0.3,
    ignoreLocation: true,
    keys: ['ncm', 'description', 'brand', 'keywords', 'info']
  });
  const result = fuse.search(pattern);

  const onlyProducerProducts = result.map(({ item }) => ({ ...item }));

  return onlyProducerProducts;
};

module.exports = producerProductSearch;
