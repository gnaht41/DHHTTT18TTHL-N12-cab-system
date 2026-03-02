module.exports = (err, req, res, next) => {

  console.error("Gateway Error:", err);

  res.status(500).json({
    success: false,
    message: "Gateway internal error",
    requestId: req.context?.requestId
  });
};