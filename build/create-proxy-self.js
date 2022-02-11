// 创建属于自己的 请求代理文件 proxy-self.js
const fs = require("fs");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
const createProxySelfFile = function () {
  const filePath = resolve("./config/proxy-self.js");
  try {
    fs.statSync(filePath);
  } catch (e) {
    console.info("创建 proxy-self.js 文件完成");
    const text = `/* @desc devServer 代理配置 */
                  module.exports = {
                    proxyTable: {
                      '/api': {
                        target: 'http://10.1.1.123:8110',
                        secure: false,
                        changeOrigin: true,
                        pathRewrite: { '^/api': '' }
                      }
                    }
                  };
                `;
    fs.writeFileSync(path.join(__dirname, "../config/proxy-self.js"), text);
  }
};
createProxySelfFile();
