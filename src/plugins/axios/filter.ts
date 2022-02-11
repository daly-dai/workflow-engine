/**
 * @desc api请求插件自定义扩展
 */
import { has } from "lodash-es";

const Expand = class Filter {
  // 白名单扩展
  isWhite(options: any = {}) {
    if (has(options, "token")) {
      delete options.token;
    }

    options.isWhite = true;

    return options;
  }

  // /**
  //  * @desc `refresh_token` 刷新 token
  //  * @param {Object} instance - axios 的请求实例
  //  * @param {String} api - 刷新 token 的接口名称 `/auth/refresh`
  //  */
  // refreshToken(instance, api) {
  //   return new Promise(function (resolve, reject) {
  //     // setTimeout(() => {
  //     console.warn(
  //       '----------请求刷新接口-------------',
  //       store.getters['platform/getRefreshToken']
  //     );
  //     instance({
  //       method: 'POST',
  //       url: api,
  //       params: {
  //         grant_type: 'refresh_token',
  //         refresh_token: store.getters['platform/getRefreshToken']
  //       },
  //       headers: {
  //         Authorization: 'Basic dGVzdF9jbGllbnQ6dGVzdF9zZWNyZXQ='
  //       }
  //     })
  //       .then((resData) => {
  //         if (
  //           resData.code !== Vue.prototype.$constant.apiServeCode.SUCCESS_CODE
  //         ) {
  //           console.warn('刷新token的返回结果-catch：', resData);
  //           reject(new Error(JSON.stringify(resData)));
  //           return;
  //         }
  //         resolve(resData);
  //         return true;
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //     // }, 0);
  //   });
  //   /* return instance({
  //      method: 'post',
  //      url: api,
  //      data: {
  //        refresh_token: store.getters['platform/getRefreshToken']
  //      }
  //    }); */
  // }

  // 重新设置 token
  setToken(res: any) {
    // const accessToken = res.data.access_token;
    // store.dispatch('setUserData', { data: res.data });
    // store.dispatch('platform/updateData', { data: res.data });
    // store.dispatch('platform/setApiHeaderParams', { token: accessToken });
  }

  // 外部过滤器处理
  // eslint-disable-next-line no-unused-vars
  // threeOuterFilter(headerOptions, baseURL, pickHeaders) {}
};
export default new Expand();
