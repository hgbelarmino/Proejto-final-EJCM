const express = require("express");

const productController = require("../controllers/product.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


router.post("/produtos", authMiddleware, productController.createProduct);
router.get("/produtos", productController.listProducts);
router.get("/produtos/:id", productController.getProductById);
router.put("/produtos/:id", authMiddleware, productController.updateProduct);
router.delete("/produtos/:id", authMiddleware, productController.deleteProduct);

module.exports = router;