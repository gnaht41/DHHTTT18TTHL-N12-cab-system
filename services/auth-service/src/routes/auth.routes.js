const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh", controller.refresh);
router.get("/me", verifyToken, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;