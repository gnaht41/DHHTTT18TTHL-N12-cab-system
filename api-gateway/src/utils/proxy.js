const { createProxyMiddleware } =
  require("http-proxy-middleware");

module.exports = function proxy(target) {

  return createProxyMiddleware({
    target,
    changeOrigin: true,

    pathRewrite: {
      "^/v1": ""
    },

    onProxyReq: (proxyReq, req) => {

      if (req.headers["x-user-id"]) {
        proxyReq.setHeader(
          "x-user-id",
          req.headers["x-user-id"]
        );
      }

      if (req.headers["x-request-id"]) {
        proxyReq.setHeader(
          "x-request-id",
          req.headers["x-request-id"]
        );
      }
    }
  });
};