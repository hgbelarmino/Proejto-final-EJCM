const express = require("express");

const userRoutes = require("./routes/user.routes");

const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());

app.use(userRoutes);

app.use(productRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});