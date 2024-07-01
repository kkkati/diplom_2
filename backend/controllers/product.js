const Product = require("../models/Product");

//add
async function addProduct(product) {
  const newProduct = await Product.create(product);
  return newProduct;
}

//delete
function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

//edit
async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    returnDocument: "after",
  });
  return newProduct;
}

//get list
async function getProducts(
  search = "",
  category = "Все категории",
  sortValue = 1,
  limit = 10,
  page = 1
) {
  const [products, count] = await Promise.all([
    Product.find({ name: { $regex: search, $options: "i" } })
      .find(category === "Все категории" ? {} : { category: category })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ price: Number(sortValue) === 1 ? "asc" : "desc" }),
    Product.countDocuments({ name: { $regex: search, $options: "i" } }),
  ]);
  return {
    products,
    lastPage: Math.ceil(count / limit),
  };
}

//get item
function getProduct(id) {
  return Product.findById(id);
}

module.exports = {
  addProduct,
  deleteProduct,
  getProducts,
  getProduct,
  editProduct,
};
