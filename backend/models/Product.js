const mongoose = require("mongoose");
const validator = require("validator");

const ProductShema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    count: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductShema);

module.exports = Product;
