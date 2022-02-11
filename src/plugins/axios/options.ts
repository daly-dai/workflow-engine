import { ApiConfig, AxiosConfig } from "./type";

const apiDefaultConfig: ApiConfig = {
  mockBasePath: "",
  mock: false,
  gParams: {},
  cache: false,
  reconnectMaxNum: 0,
  seq: "/",
  invalidChar:
    // eslint-disable-next-line quotes
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]",
  // 前端 response 返回状态码提示短语 https://blog.csdn.net/chuxuan0215/article/details/90676692
  statusMessage: {
    400: "错误请求", // Bad Request
    401: "未经授权", // Unauthorized
    402: "付费请求", // Payment Required
    403: "禁止", // Forbidden
    404: "找不到请求地址", // Not Found
    405: "方法不被允许", // Method Not Allowed
    406: "不可接受", // Not Acceptable
    407: "需要代理身份验证", // Proxy Authentication Required
    408: "请求超时", // Request Timeout
    409: "指令冲突", // Conflict
    410: "文档永久地离开了指定的位置", // Gone
    411: "需要Content-Length头请求", // Length Required
    412: "前提条件失败", // Precondition Failed
    413: "请求实体太大", // Request Entity Too Large
    414: "请求URI太长", // Request-URI Too Long
    415: "不支持的媒体类型", // Unsupported Media Type
    416: "请求的范围不可满足", // Requested Range Not Satisfiable
    417: "期望失败", // Expectation Failed
    429: "太多请求", // Too Many Requests
    500: "内部服务器错误", // Internal Server Error
    501: "未实现", // Not Implemented
    502: "错误网关", // Bad Gateway
    503: "无法获得服务", // Service Unavailable
    504: "网关超时", // Gateway Timeout
    505: "HTTP版本不支持", // HTTP Version Not Supported
  },
  console_request_enable: false,
  console_response_enable: false,
  request_error_callback: null,
};

const axiosDefaultConfig: AxiosConfig = {
  timeout: 15000,
  baseURL: "",
  maxContentLength: 2000,
  status: 200,
  statusText: "OK",
  transformResponse: [],
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  defaults: {},
  responseType: "json",
  proxy: {},
};

export { apiDefaultConfig, axiosDefaultConfig };
