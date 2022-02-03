const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authentification");
const verifyRole = require("../middlewares/permissions");

router.get("/", userController.getAll);
router.get("/:id", userController.getUser);
router.post("/add", authenticate, verifyRole("ADMIN"), userController.addUser);
router.put("/update/:id", authenticate, userController.updateUser);
router.delete("/delete/:id", authenticate, verifyRole("ADMIN"), userController.deleteUser);

module.exports = router;