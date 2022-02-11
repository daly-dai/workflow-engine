/**
 * @desc axios-api-query ajax请求拦截器
 */
import NProgress from "nprogress";
import { get, includes, isEmpty, has, isNil } from "lodash-es";
import { USER_API_CONFIG } from "@config/index.js";
// import filterExpand from "@plugins/axios/filter.js";
// import { getCurrentInstance } from 'vue';

// const unTokenExpireWatch = null; // 动态监听器 watch

// 请求开始发送
const apiRequestStartHandler = function () {
  if (USER_API_CONFIG.isShowNProgress) {
    NProgress.start();
  }
};

interface Response {
  code?: string;
  data?: any;
  mesg?: string;
  msg?: string;
  message?: string;
}

interface Error {
  status: any;
  statusText: string;
  config: any;
  instance: any;
}

/**
 * @description 请求结束的回调函数
 * @param { Response }  response 返回的数据格式
 */
const apiRequestEndHandler = function (response: Response = {}) {
  const code = get(response, "data.code", "-100");
  // token 过期或无效
  if (code === USER_API_CONFIG.api_server_code.TOKEN_EXPIRE_CODE) {
    console.log("object");
  }

  // 其它异常 code
  if (includes(USER_API_CONFIG.api_server_code.WRONG_CODE, code)) {
    const result = get(
      response,
      "config.request_error_callback",
      function () {}
    )(
      {
        status: get(response, "data.data"),
        statusText: get(response, "data.mesg"),
        data: response.data,
      },
      {},
      false
    );

    if (result || isNil(result)) {
      let msg = "未定义的错误msg";

      if (has(response, "data.msg")) {
        msg = get(response, "data.msg");
      }
      if (has(response, "data.message")) {
        msg = get(response, "data.message");
      }
      if (has(response, "data.mesg")) {
        msg = get(response, "data.mesg");
      }

      console.log(msg, 87787878);
    }
  }

  if (USER_API_CONFIG.isShowNProgress) {
    NProgress.done();
  }
};

// 请求出现拦截器无法捕获的异常 例如：timeout 请求超时
const apiRequestInterceptErrorHandler = function (message: string) {
  console.log(message);

  if (USER_API_CONFIG.isShowNProgress) {
    NProgress.done();
  }
};

// const isRefreshing = false; // 标记是否正在刷新 token
// const requests: any[] = []; // 存储待重发请求的数组

/**
 * @description 请求出现后置拦截器错误，例如：Request failed with status code 502
 * @param error
 * @param data
 * @param state
 * @returns
 */
const requestErrorCallback = function (
  error: Error = {
    status: 1001,
    statusText: "未知错误",
    config: {},
    instance: undefined,
  },
  data: Response = {},
  state = true
) {
  if (!isEmpty(error.config)) {
    console.info(
      error.config.url,
      USER_API_CONFIG.api_server_code.AUTH_REFRESH_API,
      includes(
        error.config.url,
        USER_API_CONFIG.api_server_code.AUTH_REFRESH_API
      )
    );
  }

  if (!state) return;

  let code = error.status;
  let msg = error.statusText;

  if (
    !isEmpty(data) &&
    has(data, "code") &&
    (has(data, "message") || has(data, "msg"))
  ) {
    code = data.code;
    msg = has(data, "msg") ? (data.msg as string) : (data.message as string);
  }

  console.log(code, msg);

  if (USER_API_CONFIG.isShowNProgress) {
    NProgress.done();
  }
};

export {
  apiRequestStartHandler,
  apiRequestEndHandler,
  apiRequestInterceptErrorHandler,
  requestErrorCallback,
};
