// 默认的路由配置
export interface defaultRouter {
  mode: String;
  base: String;
  transitionOnLoad: Boolean;
  scrollBehavior: Object;
  [propName: string]: any;
}

export interface ApiServerCode {
  WRONG_CODE: string[];
  TOKEN_EXPIRE_CODE: string;
  AUTH_REFRESH_API: string;
}

// api的基本格式
export interface apiConfig {
  isShowNProgress: Boolean; // 是否在顶部显示加载进度条
  mockBasePath: String; // mock 为 true 时使用的地址，如：https://yapi.tianli.shop/mock/438/
  mock: Boolean; // mock 总开关（true 打开 false 关闭）
  console_request_enable: Boolean;
  console_response_enable: boolean;
  request_error_callback: Function;
  api_server_code: ApiServerCode;
}

export interface constDeafultConfig {
  sep: string;
}

// axios的基本配置
export interface axiosConfig {
  baseURL: String;
  timeout: Number;
}

export interface defaultRouterConfig {
  name: string;
  path: string;
  meta: {
    title: string;
  };
  children: defaultRouterConfig[];
}
