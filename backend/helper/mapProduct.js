module.exports = function (product) {
  return {
    id: product._id,
    name: product.name,
    category: product.category,
    imageUrl: product.image,
    price: product.price,
    count: product.count,
  };
};
