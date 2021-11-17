const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    proxy.createProxyMiddleware({
      target: "https://aip.baidubce.com/rest/2.0/face/v3",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
  app.use(
    "/apc",
    proxy.createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
      pathRewrite: {
        "^/apc": "",
      },
    })
  );
};
