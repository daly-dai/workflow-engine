/**
 * 路由配置
 * 对应 module 目录下的文件
 * 入口文件
 */
import { AppRouteRecordRaw } from "./type";
import {
  set,
  cloneDeep,
  keys,
  has,
  split,
  dropRight,
  isEmpty,
} from "lodash-es";

const requireModule = (import.meta as any).globEager("./module/**/*.ts");
const modules: any = {};

// 获取common中的数据并放入modules中
const commonName: any = keys(requireModule).find((item) => {
  return item.toString().indexOf("common") > -1;
});

const commonVal = { ...requireModule[commonName] }.default;

set(modules, "common", commonVal);

/**
 * @description 设置子路由
 * @param { object:AppRouteRecordRaw } moduleRouter 模块的数据
 * @param {string} path  路径
 */
const setRouterChildren = function (
  moduleRouter: AppRouteRecordRaw,
  path: string
): void {
  if (!has(moduleRouter, "children")) {
    set(moduleRouter, "children", []);
  }

  const requireModuleList = requireModule[path].default;

  for (let i = 0, len = requireModuleList.length; i < len; i++) {
    const oRouterConfig: AppRouteRecordRaw = requireModule[path].default[i];

    (moduleRouter.children as AppRouteRecordRaw[]).push(oRouterConfig);
  }
};

/**
 * @description 根据name获取common中响应的模块数据
 * @param { string } name  router 中的name名称
 * @param { Array } commonRoutes  router 中的name名称
 * @returns 相应的模块数据
 */
const getModuleDataByName = (key: string): any => {
  let status = false;
  let data: any = {};

  function getDataByKey(list: AppRouteRecordRaw[]) {
    if (status) return false;

    for (const item of list) {
      if (item.name === key) {
        status = true;
        data = item;
        break;
      }

      if (item?.children && item.children.length) {
        getDataByKey(item.children);
      }
    }
  }

  getDataByKey(commonVal);

  return data;
};

/**
 * @description 设置默认的路由及其配置
 * @param { string } moduleName 模块的名称的name
 * @param { Boolean } isCommon  是否为boolean的值
 */
function setDefaultRouter(
  moduleName: string,
  isCommon: Boolean = false
): AppRouteRecordRaw {
  const defaultUrl = isCommon ? "/" : "";

  const data = {
    path: defaultUrl + moduleName,
    name: moduleName,
    children: [],
  };

  return cloneDeep(data);
}

/**
 * @description 对文件路径进行处理
 * @param filePath 文件路径
 * @returns { Array } 处理之后的名称
 */
function disposeFilePath(filePath: string): string[] | any {
  // 去除多余的字符串./
  let fullName = filePath.replace(/(\.\/|\.ts)/g, "");
  // 截取./module
  fullName = fullName.substring(7);
  // 对获取的字符串进行分割
  const aModuleNameList = split(fullName, "/");

  return aModuleNameList;
}

// 排序之后的key值顺序
const orderModuleKey = keys(requireModule).sort((pre, cur) => {
  return pre.length - cur.length;
});

// 遍历路由文件并对路由文件进行拼装
orderModuleKey.forEach((filePath) => {
  if (filePath === "./index.ts") return;

  if (filePath.split("/").length <= 3) return;

  const aModuleNameList: string[] = disposeFilePath(filePath);
  const aDropRightArray: string[] = dropRight(aModuleNameList);
  const moduleName = aDropRightArray[aDropRightArray.length - 1] as string;

  for (let i = 0; i < aDropRightArray.length; i++) {
    const data = getModuleDataByName(aDropRightArray[i]);

    if (isEmpty(data)) {
      const data = setDefaultRouter(moduleName, true);

      commonVal.splice(1, 0, data);
      setRouterChildren(data, filePath);
      break;
    }

    setRouterChildren(data, filePath);
  }
});

export default modules.common;
