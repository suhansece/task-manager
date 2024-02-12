const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Your API endpoint
    createProxyMiddleware({
      target: 'https://bus-tracking-server.onrender.com', // The target host
      changeOrigin: true, // Needed for virtual hosted sites
    })
  );
};
