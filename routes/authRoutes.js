const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authentification");

router.post("/login", authController.login);
router.post("/signUp", authController.signUp);
router.post("/logout",authenticate, authController.logout);

module.exports = router;