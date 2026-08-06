const express = require("express");

const productController = require("../controllers/product.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const validateProduct = require("../middlewares/validateProduct");

const router = express.Router();

console.log(
  "Tipo da validação:",
  typeof validateProduct
);

router.post("/produtos",
    authMiddleware,
    validateProduct,
    productController.createProduct);

router.get("/produtos", productController.listProducts);

router.get("/produtos/:id", productController.getProductById);

router.put("/produtos/:id",
    authMiddleware,
    productController.updateProduct);

router.delete("/produtos/:id", authMiddleware, productController.deleteProduct);

module.exports = router;