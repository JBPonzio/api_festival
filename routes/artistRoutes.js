const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");
const authenticate = require("../middlewares/authentification");
const verifyRole = require("../middlewares/permissions");

router.get("/", artistController.getAll);
router.get("/:id", artistController.getArtist);
router.put("/update/:id", authenticate, verifyRole("ADMIN"), artistController.updateArtist);
router.delete("/delete/:id",authenticate, verifyRole("ADMIN"), artistController.deleteArtist);

module.exports = router;