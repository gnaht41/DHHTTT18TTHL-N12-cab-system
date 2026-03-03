const router = require('express').Router();
const { createServiceProxy } = require('../services/proxy');

router.use(
  '/',
  createServiceProxy(process.env.USER_SERVICE)
);

module.exports = router;