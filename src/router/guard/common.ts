/**
 * @desc 路由拦截器
 */
import NProgress from "nprogress";
import {
  ROUTER_WHITE_LIST,
  WINDOW_TITLE_UPDATE,
  LOGIN_PAGE_NAME,
} from "@config/index";
import { isEmpty } from "lodash-es";
import { userStore } from "@/store/module/user";
import type { Router } from "vue-router";

/**
 * @description 全局前置守卫
 * @param to
 * @param from
 * @param next
 * @returns
 */
const commonInterceptorFun = function (router: Router) {
  router.beforeEach((to: any, from: any, next: any) => {
    NProgress.start();
    const user = userStore();
    const isLogin = user.isLogin;

    // 没有匹配到路由项则回退到 from 的路由
    if (isEmpty(to.matched)) {
      NProgress.done();

      return next(from);
    }

    // 设置页面的标题
    if ("title" in to.meta && WINDOW_TITLE_UPDATE) {
      document.title = to.meta.title;
    }

    // 白名单直接跳转
    if (ROUTER_WHITE_LIST.includes(to.name)) {
      NProgress.done();
      return next();
    }

    // 将未登录的状态的页面重定向到登录页面
    if (!isLogin && to.name !== LOGIN_PAGE_NAME) {
      NProgress.done();
      // 这里需要注意：有个name这个的意思是会在进入一次 beforeEach 钩子，如果next()这样则表示放过这个路由直接进入到路由指定的那个component组件
      return next({ name: LOGIN_PAGE_NAME });
    }

    // 设置请求头token的内容
    user.setApiToken();

    next();
  });
};

/**
 * @description 全局后置守卫
 * @param to
 * @param from
 */
const routerAfterEachFunc = function (to: any, from: any) {
  // NProgress.done();
};

export { commonInterceptorFun, routerAfterEachFunc };
