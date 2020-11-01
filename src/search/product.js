const Fuse = require('fuse.js');

const productSearch = ({ pattern, products, options }) => {
  const fuse = new Fuse(products, options);
  const result = fuse.search(pattern);

  const onlyProducts = result.map(({ item }) => ({ ...item }));

  return onlyProducts;
};

module.exports = { productSearch };
