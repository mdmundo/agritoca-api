const Fuse = require('fuse.js');

const productSearch = ({ pattern, products }) => {
  const fuse = new Fuse(products, { keys: ['ncm', 'description'] });
  const result = fuse.search(pattern);

  const onlyProducts = result.map(({ item }) => ({ ...item }));

  return onlyProducts;
};

module.exports = productSearch;
