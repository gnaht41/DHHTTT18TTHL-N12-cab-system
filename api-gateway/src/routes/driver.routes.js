const router = require('express').Router();
const { createServiceProxy } = require('../services/proxy');

router.use(
  '/',
  createServiceProxy(process.env.DRIVER_SERVICE)
);

module.exports = router;