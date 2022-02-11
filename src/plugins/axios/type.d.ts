/**
 * @desc api接口插件全局应该提供的统一参数
 */
interface ApiConfig {
  mockBasePath?: string; // mock-url请求地址(可以是相对 URL), 应该外部传入
  mock?: Boolean; // mock全局控制开关
  gParams?: unknown; // URL全局自定义参数
  cache?: Boolean; // 缓存控制开关在URL路径后面添加一个时间戳参数 _=1571825001570
  reconnectMaxNum?: number; // 请求失败允许的最大重连次数 - 未做开发
  seq?: string; // api接口命名空间分隔符
  invalidChar?: string; // `~!@#$^&*()=|{}\':;\',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？ 进行特殊字符过滤的字符
  statusMessage?: unknown; // {400: '错误请求',404: '找不到请求地址',405: '方法不被允许',500: '内部错误',502: '错误网关',503: '无法获得服务'} 前端response返回状态码提示短语
  console_request_enable?: Boolean; // 开启请求参数打印
  console_response_enable?: Boolean; // 开启响应参数打印
  request_error_callback?: unknown; // 请求错误回调函数
}

/**
 * @desc axios全局应该提供的统一参数
 */
interface AxiosConfig {
  timeout?: number; // 最大访问时间 超时时间（毫秒）
  baseURL?: string; // 访问url目录(可以是相对 URL), 应该外部传入
  maxContentLength?: number; // 定义允许的响应内容的最大尺寸（字节数）
  status?: string | number; // 来自服务器响应的 HTTP 访问处理成功状态码
  statusText?: string; // 来自服务器响应的 HTTP 状态信息短语
  transformResponse?: unknown[]; // 全局预处理过滤函数
  headers?: any; // {'Content-Type': 'application/json;charset=UTF-8'} 请求响应头
  defaults?: unknown; // 配置的默认值
  responseType?: string; // 服务器响应的数据类型
  proxy?: unknown; // 定义代理服务器的主机名称和端口
}

/**
 * @description 构建api
 * @param {Object} args - api请求模型参数
 * @prop {string} args.name - api接口名称
 * @prop {string} [args.method='GET'] - 请求类型
 * @prop {string} [args.desc] - 描述
 * @prop {string} [args.baseURL] - 访问url目录(可以是相对 URL)
 * @prop {string} args.path='root/user/getUserInfo' - 请求接口路径
 * @prop {string} args.mockPath='mock/root/user/getUserInfo' - mock请求接口路径
 * @prop {boolean} [args.mock=false] - 是否打开mock操作
 * @prop {boolean} [args.cache=false] - 是否打开cache
 * @prop {object} [args.restful] - restful参数
 * @prop {object} [args.headers] - 请求首部字段参数
 * @prop {string} [args.removeInvalidChar=true] - 是否执行参数特殊字符过滤
 * @prop {object} [args.params] - 待发送 Key/value 参数 GET
 * @prop {object} [args.data] - POST请求，待发送 Key/value 参数
 * @prop {object} [args.validator] - params和data参数验证对象
 * @prop {object} [args.restfulValidator] - restful参数验证对象
 * @prop {string} [args.responseType='json'] - 服务器响应的数据类型
 * @prop {object} [args.proxy=null] - 定义代理服务器的主机名称和端口
 * @prop { Boolean } [args.isWhite=false] -
 * @prop { Boolean } [args.isLogin=false] - 是否登录接口（用在了token过期的调整判断）
 * @prop {Boolean } isAbandonCheckedParams 是否放弃校验请求参数，默认 false 会校验，具体请求中设置 true 会放弃校验匹配
 * apiConfigModule: {name: 'read', desc: '', method:'GET', path: 'root/user/getUserInfo',mockPath: 'mock/root/user/getUserInfo',mock: false, cache: false, restful: {}, headers: {}, removeInvalidChar: true, params: {}, data: {},validator: {}, restfulValidator: {}, responseType: 'json', proxy: null}
 */
interface QueryConfig {
  name: string;
  method: string;
  baseURL: string;
  path: string;
  mockPath: string;
  mock: boolean;
  cache: boolean;
  restful: unknown;
  headers: object;
  removeInvalidChar: boolean;
  params: unknown;
  data: unknown;
  validator: object;
  restfulValidator: object;
  responseType: string;
  proxy: unknown;
  isWhite: boolean; // 白名单接口
  isLogin: boolean; // 是否登录接口（用在了token过期的调整判断）
  isAbandonCheckedParams: boolean; // 是否放弃校验请求参数，默认 false 会校验，具体请求中设置 true 会放弃校验匹配
  timeout: number;
}

interface AxiosConfigMap {
  [propName: string]: QueryConfig[];
}

interface RequestOptions {
  baseURL: string;
  proxy: unknown;
  responseType: string;
  validator: object;
  restfulValidator: object;
}

interface PersonalizedOptions {
  timeout: number;
}

export {
  ApiConfig,
  AxiosConfig,
  AxiosConfigMap,
  QueryConfig,
  RequestOptions,
  PersonalizedOptions,
};
