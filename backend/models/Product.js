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
      validate: {
        validator: validator.isURL,
        message: "Image should be a valid url",
      },
    },
    price: {
      type: Number,
      require: true,
    },
    count: {
      type: Number,
      require: true,
    },
    // ,
    // comments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Comment",
    //   },
    // ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductShema);

module.exports = Product;
