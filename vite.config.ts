import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx"; // 支持对jsx语法的支持
import viteSvgIcons from "vite-plugin-svg-icons"; // 对svg图片进行支持
import Components from "unplugin-vue-components/vite"; // 按需自动引入组件
import viteCompression from "vite-plugin-compression"; // 压缩的插件
import WindiCSS from "vite-plugin-windicss";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import removeConsole from "vite-plugin-remove-console";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteSvgIcons({
      // 配置路劲在你的src里的svg存放文件
      iconDirs: [resolve(process.cwd(), "static/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
    Components({
      dirs: ["src/packages/components"],
      resolvers: [ArcoResolver()],
    }),
    viteCompression(),
    WindiCSS(),
    removeConsole(), // 去除线上的console.log
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
      "@packages": resolve(__dirname, "src/packages"), // packages
      "@common": resolve(__dirname, "src/common"), // packages
      "@views": resolve(__dirname, "src/views"), // packages
      "@utils": resolve(__dirname, "src/utils"), // plugins
      "@plugins": resolve(__dirname, "src/plugins"), // plugins
      "@router": resolve(__dirname, "src/router"), // plugins
      "@config": resolve(__dirname, "src/config"), // 配置文件
      "@store": resolve(__dirname, "src/store"), // 持久化
      "@service": resolve(__dirname, "src/service"),
      "@types": resolve(__dirname, "types"),
    },
  },
  base: "./", // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    host: "0.0.0.0", // ← 新增内容 ←
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      "/api": {
        target: "http://10.1.8.31:5000",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace('/api/', '/')
      },
    },
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  // rollupOptions: {
  //   output: {
  //     manualChunks: {
  //       "lodash-es": ["lodash-es"],
  //     },
  //   },
  // },
});
