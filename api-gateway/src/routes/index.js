const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const driverRoutes = require('./driver.routes');

router.use(authMiddleware);

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/drivers', driverRoutes);

module.exports = router;