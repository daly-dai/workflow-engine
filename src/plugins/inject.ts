import LoaderApiLibrary from "@plugins/axios/index";
import { USER_API_CONFIG, USER_AXIOS_CONFIG } from "@config/index";
import apiConfigMap from "@/service/api";
import ApiFilterExpand from "./axios/filter";
import moduleConst from "@service/constant/index"; // 常量

import type { App } from "vue";

const Loader = new LoaderApiLibrary(
  apiConfigMap,
  USER_API_CONFIG,
  USER_AXIOS_CONFIG,
  ApiFilterExpand // 设置自定义扩展拦截器类
);

// 支持按需加载和全局使用两种
export { Loader, moduleConst };

export default function injectGlobOptions(app: App) {
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$loaderApiLibrary = Loader;

  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$api = Loader.api;

  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$constant = moduleConst;
}
