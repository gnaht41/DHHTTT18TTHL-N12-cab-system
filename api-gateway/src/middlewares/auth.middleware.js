const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  // auth routes bypass
  if (req.path.startsWith("/auth")) {
    return next();
  }

  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "Missing token"
    });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // propagate identity
    req.headers["x-user-id"] = payload.id;
    req.headers["x-user-role"] = payload.role;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};