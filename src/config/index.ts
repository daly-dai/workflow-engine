import { defaultRouter } from "./type";

const STORAGE_KEY = "viteSpa";
const STORE_PERSIST = true; // 是否允许store存储

const WINDOW_TITLE_UPDATE: Boolean = true; // 是否允许在路由 BeforeEach 钩子中修改标题
const HOST_PLATFORM: String = "WEB"; // 当前的宿主平台
// 登陆路由名称
const LOGIN_PAGE_NAME: string = "login";
// 根路由名称
const ROOT_PAGE_NAME: string = "root";
// 开启Cookie使用，数据在Cookie中存储的天数，默认1天
const cookieExpires: Number = 1;
// CONST 默认参数配置 sep：命名空间分隔符
const CONST_DEFAULT_CONFIG: any = {
  sep: "/",
};

// 路由白名单
const ROUTER_WHITE_LIST = ["404", "403", "401", "500", "helper", "login"];

// 路由默认配置
const ROUTER_DEFAULT_CONFIG: defaultRouter = {
  mode: "history", // 路由模式 hash、history
  base: "/spa/", // 配置单页应用的基路径
  transitionOnLoad: true,
  scrollBehavior: () => ({ y: 0 }),
};

// api 接口模型配置参数-用于覆盖 apiDefaultConfig 中的参数
const USER_API_CONFIG = {
  isShowNProgress: true, // 是否在顶部显示加载进度条
  mockBasePath: "/", // mock 为 true 时使用的地址，如：https://yapi.tianli.shop/mock/438/
  mock: false, // mock 总开关（true 打开 false 关闭）
  console_request_enable: false,
  console_response_enable: true,
  request_error_callback: () => {}, // 请求出现后置拦截器错误进入的方法
  api_server_code: {
    WRONG_CODE: ["9999", "-1", "040003", "020000", "020001"], // 异常-会被插件拦截器拦截
    TOKEN_EXPIRE_CODE: "4785848583", // token 过期 `020001`这里的token我是随意写了一个目的是不让进`interceptor/api.js`逻辑，（后端标准版无法提供一个唯一的 code 值，所以`interceptor/api.js`这里不用这个来做判断，先用返回 `mesg` 的`无效token`来做判断）
    AUTH_REFRESH_API: "/api/authentication-server/oauth/token", // 刷新 token 的接口名称 `/mock/user/refresh`
  }, // 请求服务码
};

// axios实例配置参数-用于覆盖 axiosDefaultConfig 中的参数
const USER_AXIOS_CONFIG = {
  baseURL: (import.meta as any).env.BASE_API,
  timeout: 5000,
};

export {
  CONST_DEFAULT_CONFIG,
  WINDOW_TITLE_UPDATE,
  HOST_PLATFORM,
  LOGIN_PAGE_NAME,
  ROOT_PAGE_NAME,
  cookieExpires,
  ROUTER_DEFAULT_CONFIG,
  USER_API_CONFIG,
  STORAGE_KEY,
  USER_AXIOS_CONFIG,
  ROUTER_WHITE_LIST,
  STORE_PERSIST,
};
