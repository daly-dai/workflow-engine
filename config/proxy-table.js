const config =
  import.meta.env.NODE_ENV === "development" ? require("./proxy-self.js") : {};
/**
 * @desc devServer 代理配置
 */
module.exports = config;
