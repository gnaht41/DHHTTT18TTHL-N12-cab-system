const { createProxyMiddleware } = require('http-proxy-middleware');

exports.createServiceProxy = (target, basePath) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,

    pathRewrite: (path) => {
      return path.replace(`/${basePath}`, '');
    },

    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader('x-user-id', req.user.id);
      }
    },

    logLevel: 'debug'
  });
  exports.createServiceProxy = (target, basePath) => {
  console.log('Proxy target:', target);

  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path) =>
      path.replace(`/${basePath}`, ''),

    logLevel: 'debug'
  });
};