const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helper/token");
const Product = require("../models/Product");

//register

async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user.id });
  return { user, token };
}

//login

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });

  await user.populate("basket.product");
  return { user, token };
}

//edit user(add product to user)
// async function editUser(id, productId, count) {
//   const product = await Product.findById(productId);
//   const newUser = await User.findByIdAndUpdate(id, {
//     $push: { basket: { product, count } },
//   });
//   return newUser;
// }

async function editUser(id, productId, count) {
  const product = await Product.findById(productId);

  const user = await User.findById(id);
  const basketItem = user.basket.find((item) => item.product.equals(productId));

  if (basketItem) {
    basketItem.count += count;
  } else {
    user.basket.push({ product, count });
  }
  await user.populate("basket.product");
  await user.save();
  return user;
}

async function deleteProductInBasket(id, productId) {
  const user = await User.findById(id);
  user.basket.pull({ _id: productId });
  await user.save();

  return user;
}

async function deleteBasket(id) {
  const user = await User.findById(id);
  user.basket = undefined;
  await user.save();

  return user;
}

async function getUserBasket(id) {
  const user = await User.findById(id);
  await user.populate("basket.product");
  await user.save();

  return user;
}

module.exports = {
  register,
  login,
  editUser,
  getUserBasket,
  deleteProductInBasket,
  deleteBasket,
};

// const newUser = await User.findByIdAndUpdate(id, {
//   $push: { basket: { product, count } },
// });

// for (let i = 0; i < count; i++) {
//   const newUser = await User.findByIdAndUpdate(id, {
//     $push: { basket: product },
//   });
// }
