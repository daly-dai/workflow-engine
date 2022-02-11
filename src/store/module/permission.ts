import { defineStore } from "pinia";
import { STORE_PERSIST } from "@config/index";
import { Loader, moduleConst } from "@plugins/inject";
function getPermissionMenu() {
  return new Promise((resolve, reject) => {
    Loader.api["common/getAuthTree"]().then((res: any) => {
      if (res.code === moduleConst.apiCode.SUCCESS_CODE) {
        resolve(res.data);
        return;
      }

      reject(new Error("error to getAuthTree"));
    });
  });
}

export const permissionStore = defineStore({
  id: "permissionStore",
  state: () => {
    return {
      menuTree: [],
      currentMenu: [],
      appStatus: false, // 是否获取到菜单
    };
  },
  getters: {
    /**
     * @description 获取权限按钮树
     * @param state
     */
    getMenuTree(state) {
      return state.menuTree;
    },
    /**
     * @description 获取应用的状态
     * @param state
     * @returns
     */
    getAppStatus(state) {
      return state.appStatus;
    },
    /**
     * @description 获取当前的权限树
     * @param state
     * @returns
     */
    getCurrentMenu(state) {
      return state.currentMenu;
    },
  },
  actions: {
    /**
     * @description 获取权限数据
     */
    async getAuthTree() {
      this.appStatus = false;

      this.menuTree = (await getPermissionMenu()) as never;
      console.log(this.menuTree, 777777);

      this.appStatus = true;
    },
    /**
     * @description 设置权限树
     * @param menuData
     */
    setMenuTree(menuData: any) {
      this.menuTree = menuData;
    },
    /**
     * @description 设置当前的按钮
     * @param menuData
     */
    setCurrentMenu(menuData: any) {
      this.currentMenu = menuData;
    },
    /**
     * @description 设置权限按钮状态
     * @param status
     */
    setAppStatus(status: boolean) {
      this.appStatus = status;
    },
    /**
     * @description 登出操作
     */
    logout() {
      this.menuTree = [];

      this.currentMenu = [];
      this.appStatus = false; // 是否获取到菜单
    },
  },
  persist: {
    enabled: STORE_PERSIST,
    strategies: [
      {
        storage: localStorage,
        paths: ["menuTree", "currentMenu", "appStatus"],
      },
    ],
  },
});
