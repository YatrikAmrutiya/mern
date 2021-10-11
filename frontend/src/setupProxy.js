const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/lists/custom/*',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            "secure": false,
        })
    );
};