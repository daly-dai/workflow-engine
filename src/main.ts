import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { setupStore } from "@/store";

// 导入 packages/components 自定义ui组件的自定义样式文件
import "@packages/components/theme-default/index.less";
import "virtual:windi.css";
import "virtual:windi-devtools";
import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont.js";

import injectGlobOptions from "./plugins/inject";

const app = createApp(App);
injectGlobOptions(app);

setupStore(app);

app.use(router);
app.mount("#app");

export default app;
