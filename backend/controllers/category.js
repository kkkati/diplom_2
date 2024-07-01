const Category = require("../models/Category");

//add
async function addCategory(category) {
  const newCategory = await Category.create(category);
  return newCategory;
}

//get list
function getCategorys() {
  const categorys = Category.find();
  return categorys;
}

module.exports = {
  addCategory,
  getCategorys,
};
