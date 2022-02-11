import { ComponentInternalInstance, getCurrentInstance } from "vue";

/**
 * @description 对getCurrentInstance进行啊封装
 * @returns proxy
 */
export function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;

  return {
    proxy,
  };
}
