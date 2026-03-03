const { createProxyMiddleware } = require('http-proxy-middleware');

exports.createServiceProxy = (target) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/auth': '',
      '^/users': '',
      '^/drivers': ''
    },
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader(
          'x-user-id',
          req.user.id
        );
      }
    }
  });