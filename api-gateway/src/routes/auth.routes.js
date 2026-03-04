const router = require('express').Router();
const { createServiceProxy } = require('../services/proxy');

router.use(
  '/',
  createServiceProxy(
    process.env.AUTH_SERVICE,
    '/auth'
  )
);

module.exports = router;