const crypto = require("crypto");

module.exports = (req, res, next) => {

  const requestId = crypto.randomUUID();

  req.context = {
    requestId,
    timestamp: Date.now()
  };

  req.headers["x-request-id"] = requestId;

  next();
};