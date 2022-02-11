const proxyTableConfig = require("./proxy-table.js");

module.exports = {
  server: {
    port: 4000, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    host: "0.0.0.0", // ← 新增内容 ←
    strictPort: false, // 端口已被占用不会直接退出，尝试下一个可用端口
    // 设置代理，根据我们项目实际情况配置
    proxy: proxyTableConfig.proxyTable,
    watch: {
      ignored: ["!**/node_modules/**"],
    },
  },
  build: {
    outDir: "dist", // 指定输出路径
    assetsDir: "static", // 指定生成静态资源的存放路径
  },
};
