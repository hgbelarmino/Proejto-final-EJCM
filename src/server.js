const express = require("express");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(userRoutes);

app.use(productRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});