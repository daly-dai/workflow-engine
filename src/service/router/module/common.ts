/**
 * @desc 公共路由
 */
// eslint-disable-next-line no-unused-vars
import { LOGIN_PAGE_NAME, ROOT_PAGE_NAME } from "@config/index.js";
import { basicLayout } from "@packages/layouts/index";

import { AppRouteRecordRaw } from "../type";

const commonRoutes: AppRouteRecordRaw[] = [
  {
    path: "/",
    name: ROOT_PAGE_NAME,
    redirect: {
      name: "home",
    },
    component: basicLayout,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@views/home/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: LOGIN_PAGE_NAME,
    meta: {
      title: "登录页面",
    },
    component: () => import("@views/login/login.vue"),
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@packages/views/error-page/401.vue"),
    meta: { title: "401" },
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@packages/views/error-page/403.vue"),
    meta: { title: "403" },
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@packages/views/error-page/500.vue"),
    meta: { title: "500" },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@packages/views/error-page/404.vue"),
    meta: { title: "404" },
  },
  {
    path: "/:pathMatch(.*)",
    name: "bad-not-found",
    component: () => import("@packages/views/error-page/404.vue"),
  },
];

export default commonRoutes;
