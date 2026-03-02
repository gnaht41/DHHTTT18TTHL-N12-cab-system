module.exports = (req, res, next) => {

  const version =
    req.headers["api-version"] || "v1";

  req.headers["x-api-version"] = version;

  next();
};