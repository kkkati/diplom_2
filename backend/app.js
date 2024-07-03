const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  register,
  login,
  editUser,
  getUserBasket,
  deleteProductInBasket,
  deleteBasket,
} = require("./controllers/user");
const mapUser = require("./helper/mapUser");
const mapProduct = require("./helper/mapProduct");
const {
  addProduct,
  deleteProduct,
  getProducts,
  getProduct,
  editProduct,
} = require("./controllers/product");
const hasRole = require("./midlewares/hasRole");
const ROLES = require("./constants/roles");
const authenticated = require("./midlewares/authenticated");
const { addCategory, getCategorys } = require("./controllers/category");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknow error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknow error" });
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

app.get("/products", async (req, res) => {
  const { products, lastPage } = await getProducts(
    req.query.search,
    req.query.category,
    req.query.sort,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

app.get("/products/:id", async (req, res) => {
  const product = await getProduct(req.params.id);
  res.send({ data: mapProduct(product) });
});

app.patch("/products/:id", async (req, res) => {
  const updateProduct = await editProduct(req.params.id, {
    name: req.body.name,
    category: req.body.category,
    image: req.body.imageUrl,
    price: req.body.price,
    count: req.body.count,
  });
  res.send({ data: mapProduct(updateProduct) });
});

app.post("/categorys", async (req, res) => {
  const newCategory = await addCategory({
    name: req.body.name,
  });

  res.send({ data: newCategory });
});

app.get("/categorys", async (req, res) => {
  const categorys = await getCategorys();
  res.send({ data: categorys });
});

app.use(authenticated);

app.get("/users/:id", async (req, res) => {
  const user = await getUserBasket(req.params.id);
  res.send({ data: mapUser(user) });
});

app.patch("/users/:id/basket/:productId", async (req, res) => {
  const updateUser = await deleteProductInBasket(
    req.params.id,
    req.params.productId
  );
  res.send({ data: mapUser(updateUser) });
});

app.patch("/users/:id/basket", async (req, res) => {
  const updateUser = await deleteBasket(req.params.id);
  res.send({ data: mapUser(updateUser) });
});

app.patch("/users/:id", async (req, res) => {
  const updateUser = await editUser(
    req.params.id,
    req.body.productId,
    req.body.count
  );
  res.send({ data: mapUser(updateUser) });
});

app.post("/products", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newProduct = await addProduct({
    name: req.body.name,
    category: req.body.category,
    image: req.body.imageUrl,
    price: req.body.price,
    count: req.body.count,
  });

  res.send({ data: mapProduct(newProduct) });
});

app.delete("/products/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteProduct(req.params.id);

  res.send({ error: null });
});

mongoose
  .connect(
    `mongodb+srv://kati600zx:kati600zx@cluster0.qi5wc9w.mongodb.net/hotel?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });
