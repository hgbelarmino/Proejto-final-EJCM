const express = require("express");

const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/usuarios", userController.createUser);
router.get("/usuarios", userController.listUsers);
router.get("/usuarios/:id", userController.getUserById);
router.put("/usuarios/:id", userController.updateUser);
router.delete("/usuarios/:id", userController.deleteUser);

module.exports = router;