const path = require("path");
const PROXY_CONFIG = require("./vue.proxy");

const resolve = dir => path.join(__dirname, dir);

const isDevelopment = process.env.VUE_APP_ENV === "development";
const isProduction = process.env.VUE_APP_ENV === "production";

module.exports = {
  assetsDir: isDevelopment ? "" : "frontend",

  lintOnSave: true,

  productionSourceMap: isProduction ? false : true,

  transpileDependencies: [
    /mo/,
    /mo-ui/,
    /lqq-ui/,
  ],

  configureWebpack: {
    resolve: {
      alias: {
        "mo": resolve("node_modules/@weiyi/mo"),
        "mo-ui": resolve("mo-ui"),
        "mo-guide": resolve("mo-guide"),
      }
    }
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("qq/qq-ui/assets/style/var.less")]
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    host: "0.0.0.0",
    port: 7070,
    disableHostCheck: true,
    proxy: PROXY_CONFIG
  }
};
