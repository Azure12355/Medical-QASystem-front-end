const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8888,
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        pathRewrite: {
          "^/api": "",
        },
      },
      "/apache": {
        target: "https://echarts.apache.org/examples",
        pathRewrite: {
          "^/apache": "",
        },
      },
    },
  },
});
