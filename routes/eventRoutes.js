const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authenticate = require("../middlewares/authentification");
const verifyRole = require("../middlewares/permissions");

const {eventModel} = require("../models/eventModel");

router.get("/", eventController.getAll);
router.get("/:id", eventController.getEvent);
router.put("/update/:id", authenticate,verifyRole("ADMIN"), eventController.updateEvent);
router.delete("/delete/:id", authenticate, verifyRole("ADMIN"), eventController.deleteEvent);

module.exports = router;