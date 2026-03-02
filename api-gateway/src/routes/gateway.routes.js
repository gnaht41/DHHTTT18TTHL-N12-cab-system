const express = require("express");
const router = express.Router();

const proxy = require("../utils/proxy");
const services = require("../config/services");

// routing mapping (MVP spec)

router.use("/auth", proxy(services.auth));
router.use("/bookings", proxy(services.booking));
router.use("/rides", proxy(services.ride));
router.use("/payments", proxy(services.payment));

module.exports = router;