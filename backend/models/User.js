const mongoose = require("mongoose");
const roles = require("../constants/roles");

const UserShema = mongoose.Schema(
  {
    login: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: roles.USER,
    },
    basket: [
      // {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Product",
      // },
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: { type: Number, require: true },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserShema);

module.exports = User;
