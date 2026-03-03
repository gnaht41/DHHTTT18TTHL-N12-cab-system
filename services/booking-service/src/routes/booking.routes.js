const express = require("express");
const controller = require("../controllers/booking.controller");

const router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/:id", controller.getById);

module.exports = router;