import querystring from "querystring";
import {
  pick,
  assign,
  keys,
  isNil,
  set,
  get,
  has,
  isArray,
  hasIn,
  concat,
  isEmpty,
  now,
  isString,
  omit,
  isFunction,
  replace,
  cloneDeep,
  isObject,
} from "lodash-es";

import { apiDefaultConfig, axiosDefaultConfig } from "./options";
import {
  ApiConfig,
  AxiosConfig,
  AxiosConfigMap,
  RequestOptions,
  QueryConfig,
} from "./type";

import AxiosProxyClass from "./api";

const Loader = class apiModel {
  ApiFilterExpand: any;

  headerOptions: any;

  api: any;

  apiParamsConfig: ApiConfig;

  axiosParamsConfig: Partial<AxiosConfig>;

  axiosAttributeMap: any = {
    params: "",
    data: "",
    headers: "",
    restful: "",
  };

  constructor(
    userApiConfigModuleList: AxiosConfigMap,
    userApiConfig: ApiConfig,
    userAxiosConfig: AxiosConfig,
    ApiFilterExpand: any
  ) {
    this.ApiFilterExpand = ApiFilterExpand; // 自定义拦截器类
    this.headerOptions = {}; // 请求头配置
    this.api = {};

    /**
     * @access private
     * @readonly
     * @desc api接口模型配置参数
     *
     * */
    this.apiParamsConfig = pick(
      assign(apiDefaultConfig, userApiConfig),
      keys(apiDefaultConfig)
    );

    /**
     * @access private
     * @readonly
     * @desc axios实例配置模型
     *
     */
    this.axiosParamsConfig = pick(
      assign(axiosDefaultConfig, userAxiosConfig),
      keys(axiosDefaultConfig)
    );

    this.deconstructApiConfigModule(userApiConfigModuleList);
  }

  /**
   * @description 解析api模型
   * @access private
   * @param { object } userApiConfigModuleList - api接口模型列表
   */
  deconstructApiConfigModule(userApiConfigModuleList: AxiosConfigMap = {}) {
    keys(userApiConfigModuleList).forEach(
      (moduleFileHierarchyNameKey: string) => {
        const apiItem: QueryConfig[] =
          userApiConfigModuleList[moduleFileHierarchyNameKey];

        if (isNil(apiItem)) return;

        for (let i = 0; i < apiItem.length; i++) {
          this.buildInstance(moduleFileHierarchyNameKey, apiItem[i]);
        }
      }
    );
  }

  /**
   * @description 构建api实例
   * @access private
   * @example
   * namespace：'goods/fruit'
   * apiConfigModule: {name: 'read', desc: '', method:'GET', path: 'root/user/getUserInfo',mockPath: 'mock/root/user/getUserInfo',mock: false, cache: false, restful: {}, headers: {}, removeInvalidChar: true, params: {}, data: {},validator: {}, restfulValidator: {}, responseType: 'json', proxy: null}
   */
  buildInstance(namespace = "", queryConfigItem: QueryConfig) {
    let {
      name,
      method = "GET",
      // desc = '',
      baseURL,
      path,
      mockPath,
      mock,
      cache = false,
      restful = {},
      headers = {},
      // eslint-disable-next-line no-unused-vars
      removeInvalidChar = true,
      params = {},
      // eslint-disable-next-line no-unused-vars
      data = {},
      validator = {},
      restfulValidator = {},
      responseType,
      proxy,
      isWhite = false,
      isLogin = false,
      isAbandonCheckedParams = false,
      timeout,
    } = queryConfigItem;

    if (!name || (!path && !mockPath)) {
      console.error("error：02");
      return;
    }

    const apiName = `${namespace}${get(
      this,
      "apiParamsConfig.seq",
      "/"
    )}${name}`;

    Object.defineProperty(this.api, apiName, {
      value: (
        outParams = {
          params: {},
          data: {},
          headers: {},
          restful: {},
        },
        outOptions = {
          request_error_callback: null,
          transformResponse: null,
          validator: null,
          restfulValidator: null,
        }
      ) => {
        // outParams -> {'restful': {}, 'headers': {}, 'params': {}, 'data': {}}
        set(headers, "api-module-path", `${apiName}`);

        !has(headers, "Content-Type") &&
          set(
            headers,
            "Content-Type",
            get(
              this,
              "axiosParamsConfig.headers.Content-Type",
              "application/json;charset=UTF-8"
            )
          );

        has(outParams, "headers.Content-Type") &&
          set(headers, "Content-Type", get(outParams, "headers.Content-Type"));

        let [url, pickParams, pickData, pickHeaders, pickOptions] = [
          path,
          {},
          {},
          {},
          {},
        ];
        // 全局 mock
        if (
          (get(this, "apiParamsConfig.mock") === true && isNil(mock)) ||
          (!isNil(mock) && mock === true)
        ) {
          url = !mockPath ? "" : mockPath;
          baseURL = get(this, "apiParamsConfig.mockBasePath");
        }

        pickParams = this.setAxiosParams(
          params,
          outParams,
          isAbandonCheckedParams
        );

        if ((!get(this, "apiParamsConfig.cache", false) && !cache) || !cache) {
          set(pickParams, "_", now());
        }

        pickData = this.setAxiosData(queryConfigItem, outParams);

        if (!isEmpty(get(outParams, "restful", {})) || !isEmpty(restful)) {
          let restfulParams = pick(
            assign({}, restful, get(outParams, "restful", {})),
            keys(restful)
          );

          if (isAbandonCheckedParams) {
            // 放弃校验请求参数
            restfulParams = assign({}, restful, get(outParams, "restful", {}));
          }

          url = Loader.transformRestfulUrl(url, restfulParams);
        }

        if (!isEmpty(get(outParams, "headers", {})) || !isEmpty(headers)) {
          // headers 里的参数不进行特殊字符检查，防止比如 Content-Type 的这种原生参数设置被误检查出特殊字符
          // pickHeaders = Loader.removeInvalidChar(_pick(_assign(headers, _get(outParams, 'headers', {})), _keys(headers)), removeInvalidChar)
          let headersParams = pick(
            assign({}, headers, get(outParams, "headers", {})),
            keys(headers)
          );

          if (isAbandonCheckedParams) {
            // 放弃校验请求参数
            headersParams = assign({}, headers, get(outParams, "headers", {}));
          }

          pickHeaders = headersParams;
        }

        if (!isEmpty(this.headerOptions)) {
          // 外部设置的通用请求头参数
          pickHeaders = assign(
            {},
            omit(this.headerOptions, keys(pickHeaders)),
            pickHeaders
          );
        }

        if (!isEmpty(outOptions)) {
          pickOptions = Loader.encapsulationOutOptions(outOptions);
        }

        if (has(outOptions, "validator")) {
          assign(validator, get(outOptions, "validator"));
        }

        if (has(outOptions, "restfulValidator")) {
          assign(restfulValidator, get(outOptions, "restfulValidator"));
        }

        const requestOptions = this.encapsulationRequestOptions({
          baseURL,
          proxy,
          responseType,
          validator,
          restfulValidator,
        });

        // 拦截过滤函数处理
        if (hasIn(this.ApiFilterExpand, "threeOuterFilter")) {
          this.ApiFilterExpand.threeOuterFilter(
            this.headerOptions,
            baseURL,
            pickHeaders
          );
        }

        // 自定义扩展过虑
        isWhite && this.whiteFilter(pickHeaders);

        // 是否登录接口
        set(pickHeaders, "isLogin", isLogin);
        // isLogin && (pickHeaders.isLogin = true);

        const axiosParams = assign({}, requestOptions, pickOptions, {
          method: method.toUpperCase(),
          url,
          headers: pickHeaders,
          params: pickParams,
          data: pickData,
          restful,
          // timeout,
          apiInstance: null,
        });

        const personalizedOptions = {
          timeout,
        };

        const instance = new AxiosProxyClass(axiosParams, personalizedOptions);

        return instance;
      },
    });
  }

  /**
   * @description 设置请求的params传参
   * @param params 定义时的传参
   * @param outParams
   * @param isAbandonCheckedParams
   * @returns
   */
  setAxiosParams(
    params: unknown,
    outParams: unknown,
    isAbandonCheckedParams: boolean
  ): object {
    if (isEmpty(get(outParams, "params", {})) && isEmpty(params)) return {};

    let getParams = pick(
      assign(
        {},
        params,
        get(this, "apiParamsConfig.gParams", {}),
        get(outParams, "params", {})
      ),
      concat(keys(params), keys(get(this, "apiParamsConfig.gParams", {})))
    );

    if (isAbandonCheckedParams) {
      // 放弃校验请求参数
      getParams = assign(
        {},
        params,
        get(this, "apiParamsConfig.gParams", {}),
        get(outParams, "params", {})
      );
    }

    return getParams;
  }

  /**
   * @description 设置请求的data传参
   * @param queryConfigItem
   * @param outParams
   * @param pickData
   * @returns
   */
  setAxiosData(queryConfigItem: QueryConfig, outParams: unknown) {
    if (isEmpty(get(outParams, "data", {})) && isEmpty(queryConfigItem.data))
      return;

    let dataParams = pick(
      assign({}, queryConfigItem.data, get(outParams, "data", {})),
      keys(queryConfigItem.data)
    );

    if (queryConfigItem.isAbandonCheckedParams) {
      // 放弃校验请求参数
      if (isString(get(outParams, "data", {}))) {
        dataParams = get(outParams, "data", {});
      } else {
        dataParams = assign(
          {},
          queryConfigItem.data,
          get(outParams, "data", {})
        );
      }
    }

    // eslint-disable-next-line no-param-reassign
    const queryData = Loader.transformStringPostData(
      Loader.removeInvalidChar(dataParams, queryConfigItem?.removeInvalidChar),
      queryConfigItem.headers,
      queryConfigItem.method
    );

    return queryData;
  }

  /**
   * @desc 白名单过滤器
   * @param { Object } pickHeaders={} - Request Headers 请求头参数
   */
  whiteFilter(pickHeaders = {}) {
    if (hasIn(this.ApiFilterExpand, "isWhite")) {
      this.ApiFilterExpand.isWhite(pickHeaders);
    }
  }

  /**
   * @desc 处理并发请求
   * @param { array } apiArray - api请求实例数组
   * @access public
   * @returns {Promise}
   * @example
   * Loader.allApi[Loader.api['user/get'](), Loader.api['user/list']()]().then(()=>{}).catch(()=>{})
   */
  allApi(apiArray: any[]) {
    if (!isArray(apiArray)) {
      // eslint-disable-next-line no-param-reassign
      apiArray = [];
    }

    return Promise.all(apiArray);
  }

  /**
   * @static
   * @desc 转换url地址 fruit/hz/xh/{shop}/read -> fruit/hz/xh/1001/read
   * @access private
   * @param {string} url
   * @param {{}} restfulData
   * @returns {string}
   * @example
   * url：fruit/hz/xh/{shop}/read
   * restfulData：{'shop': 10,'id': 1}
   */
  static transformRestfulUrl(url: string, restfulData: any) {
    let restfulUrl = url;

    for (const key in restfulData) {
      if (Loader.strHaveStr(restfulUrl, `{${key}}`)) {
        restfulUrl = replace(restfulUrl, `{${key}}`, restfulData[key]);
      }
    }
    return restfulUrl;
  }

  /**
   * @description 正则匹配 判断字符串中是否包含某个字符串 strHaveStr('abc','bc')
   * @param str
   * @param regStr 包含的字符串
   * @returns
   */
  static strHaveStr(str: string, regStr: string) {
    const reg = new RegExp("^.*" + regStr + ".*$");

    if (str.match(reg)) {
      return true;
    }

    return false;
  }

  /**
   * @desc 特殊字符过滤
   * @access private
   * @static
   * @param {{}} requestData - 请求的数据对象 get post put delete
   * @param {boolean} removeInvalidChar=true - 是否需要过滤特殊字符
   */
  static removeInvalidChar(requestData: any = {}, removeInvalidChar = true) {
    if (!removeInvalidChar || isString(requestData)) return requestData;

    // 全局替换正则
    const reg = new RegExp(get(this, "apiParamsConfig.invalidChar"), "g");
    for (const key in requestData) {
      if (isString(requestData[key]) && reg.test(requestData[key])) {
        // eslint-disable-next-line no-param-reassign
        requestData[key] = replace(requestData[key], reg, "");
      }
    }
    return requestData;
  }

  /**
   * @desc
   * axios post请求 headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   * 参数需要通过qs.stringify()进行设置
   * @static
   * @access private
   * @param {{}} requestData
   * @param {{}} headersData
   * @param {string} method=GET
   */
  static transformStringPostData(
    requestData: any,
    headersData: any,
    method = "GET"
  ) {
    if (
      method.toUpperCase() === "POST" &&
      get(headersData, "Content-Type") ===
        "application/x-www-form-urlencoded; charset=UTF-8"
    ) {
      // eslint-disable-next-line no-param-reassign
      requestData = querystring.stringify(requestData);
    }
    return requestData;
  }

  /**
   * @desc 封装外部配置参数
   * @static
   * @access private
   * @param {{}} outOptions - 外部参数
   * @returns {{}}
   */
  static encapsulationOutOptions(outOptions = {}) {
    const options = {};
    const requestErrorCallback = get(
      outOptions,
      "request_error_callback",
      null
    );
    const transformResponse = get(outOptions, "transformResponse", null);

    if (isFunction(requestErrorCallback)) {
      set(options, "request_error_callback", requestErrorCallback);
    }

    if (isArray(transformResponse) || isFunction(transformResponse)) {
      set(
        options,
        "transformResponse",
        isArray(transformResponse)
          ? transformResponse
          : [isFunction(transformResponse)]
      );
    }

    return options;
  }

  /**
   * @desc 封装request请求参数
   * @access private
   * @returns {{}}
   */
  encapsulationRequestOptions({
    baseURL,
    proxy,
    responseType,
    validator,
    restfulValidator,
  }: RequestOptions) {
    const options = cloneDeep(get(this, "axiosParamsConfig"));
    if (isObject(proxy)) {
      set(options, "proxy", proxy);
    }

    if (isString(responseType)) {
      set(options, "responseType", responseType);
    }

    if (baseURL) {
      set(options, "baseURL", baseURL);
    }

    if (isFunction(get(this, "apiParamsConfig.request_error_callback", null))) {
      set(
        options,
        "request_error_callback",
        get(this, "apiParamsConfig.request_error_callback")
      );
    }

    set(
      options,
      "statusMessage",
      get(this, "apiParamsConfig.statusMessage", {})
    );

    set(
      options,
      "console_response_enable",
      get(this, "apiParamsConfig.console_response_enable", false)
    );

    set(
      options,
      "console_request_enable",
      get(this, "apiParamsConfig.console_request_enable", false)
    );

    if (
      !isArray(get(options, "transformResponse", null)) &&
      isFunction(get(options, "transformResponse", null))
    ) {
      set(options, "transformResponse", [get(options, "transformResponse")]);
    }

    return assign(options, {
      validator,
      restfulValidator,
    });
  }

  /**
   * @desc 设置请求头 headers
   * @param {Object} options={} - 外部参数
   */
  setHeaderOptions(options = {}) {
    if (!isEmpty(options)) {
      this.headerOptions = assign({}, this.headerOptions, options);
    }
  }
};

export default Loader;
