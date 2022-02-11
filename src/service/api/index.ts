/**
 * 相关接口配置
 * 异步与后端交互
 * 入口文件
 * 动态载入各个api领域模型
 */
import { camelCase, keys, set } from "lodash-es";

const requireModule = (import.meta as any).globEager("./module/**/*.ts");
const modules = {};

keys(requireModule).forEach((fileName: string) => {
  if (fileName === "./index.js") return;

  let moduleName = "";

  moduleName = fileName.replace(/(\.\/|\.ts)/g, "");
  moduleName = moduleName.substring(7);

  if (fileName.split("/").length > 2) {
    moduleName = moduleName.replace(/(\.\/|\.ts)/g, "");
  } else {
    moduleName = camelCase(moduleName.replace(/(\.\/|\.ts)/g, ""));
  }

  const moduleVal = {
    ...requireModule[fileName],
  }.default;

  set(modules, moduleName, moduleVal);
});

export default modules;
