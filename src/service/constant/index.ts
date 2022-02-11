/**
 * 常量接口配置
 * 常量枚举
 * 入口文件
 * 常量统一管理,防止数据源的到处冗余
 * 动态载入各个api领域模型
 */
import { camelCase, keys, set, assign } from "lodash-es";
// import CONST_CONFIG from "@service/constant/index.js";

const requireModule = (import.meta as any).globEager("./module/**/*.ts");

interface Modules {
  [key: string]: any;
  [key: number]: any;
}

interface DeepModuleFun {
  moduleName: string;
  moduleData: Modules;
}

const deepModule: Modules = {}; // 目前只支持两级

function setDeepModuleName({ moduleName, moduleData }: DeepModuleFun): void {
  const nameMap: string[] = moduleName
    .split("/")
    .map((name) => camelCase(name));

  set(deepModule, `${nameMap[0]}.${nameMap[1]}`, moduleData);
}

function initConstantModule() {
  const modules: Modules = {};

  keys(requireModule).forEach((fileName) => {
    if (fileName === "./module/index.ts") return;

    const moduleData: Modules = requireModule[fileName].default;

    let moduleName: string = "";

    moduleName = fileName.replace(/(\.\/|\.ts)/g, "");
    moduleName = moduleName.substring(7);

    if (moduleName.split("/").length >= 2) {
      setDeepModuleName({ moduleName, moduleData });
      return;
    }

    moduleName = camelCase(moduleName);

    set(modules, moduleName, { ...moduleData });
  });

  return assign(modules, deepModule);
}

export default initConstantModule();
