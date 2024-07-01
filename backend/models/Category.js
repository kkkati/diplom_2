const mongoose = require("mongoose");

const CategoryShema = mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
});

const Category = mongoose.model("Category", CategoryShema);

module.exports = Category;
