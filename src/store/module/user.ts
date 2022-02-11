import { defineStore } from "pinia";
import { permissionStore } from "./permission";
import { store } from "@/store";
import { Loader } from "@plugins/inject";
export interface userInter {
  userData: any;
  token: string;
  isLogin: boolean;
  refreshToken: string;
}

export const userStore = defineStore({
  id: "userStore",
  state: () => {
    return {
      userData: {}, // 用户的基本信息
      token: "", // 登录的token
      isLogin: false, // 是否为登录状态
      refreshToken: "", // 长token
    } as userInter;
  },
  getters: {
    // 获取用户信息
    getUserData(state: userInter): any {
      return state.userData;
    },
    // 获取token信息
    getToken(state: userInter): string {
      return state.token;
    },
    // 获取登录状态
    getLoginStatus(state: userInter): boolean {
      return state.isLogin;
    },
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param userData 用户数据
     */
    setUserData(userData: any) {
      this.isLogin = true;
      this.token = userData?.token;
      this.userData = { ...userData };
    },
    /**
     * @description 登出操作
     */
    handlerExit() {
      const permission = permissionStore();
      permission.logout();

      this.userData = {};
      this.token = "";
      this.isLogin = false;
      this.refreshToken = "";
    },
    /**
     * @description 设置用户的请求token
     * @param token
     */
    setApiToken() {
      Loader.setHeaderOptions({ Authorization: this.token });
    },
  },
  persist: {
    enabled: true,
    strategies: [
      // { storage: sessionStorage, paths: ["userData"] },
      {
        storage: localStorage,
        paths: ["token", "userData", "isLogin", "refreshToken"],
      },
    ],
  },
});

export function useUserStoreHook() {
  return userStore(store);
}
