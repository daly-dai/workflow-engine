import type { Router } from "vue-router";
import { permissionStore } from "@/store/module/permission";
import { userStore } from "@/store/module/user";
import { isEmpty, isArray, find } from "lodash-es";
import { getTreeMap } from "@utils/index";
import NProgress from "nprogress";
import { ROOT_PAGE_NAME } from "@config/index";

/**
 * @description 设置权限相关的操作
 * @param router
 */
function setupPermission(router: Router) {
  router.beforeEach((to, form, next: any) => {
    const permission = permissionStore();
    const user = userStore();

    // 是否为刷新
    const isRefresh =
      user.isLogin && permission.appStatus && isEmpty(form?.matched);
    // 是否为第一次登录跳转
    const isAppInit =
      user.isLogin && !permission.appStatus && to?.name === ROOT_PAGE_NAME;

    // 目前的业务两者是想同的 后面有个人需求的话可以拆开
    isRefresh && refreshPermissionMenu({ to, form, next }, permission);

    isAppInit && refreshPermissionMenu({ to, form, next }, permission);

    next();
  });
}

/**
 * @description 设置相关的按钮逻辑
 */
async function refreshPermissionMenu({ to, form, next }: any, permission: any) {
  await permission.getAuthTree();

  const permissionStatus: boolean = getPermissionByName(
    permission.menuTree,
    to.name,
    "children",
    "resourceUrl"
  );

  if (!permissionStatus) {
    next({ name: "404" });
    return;
  }

  next();
  NProgress.done();
}

/**
 * @description 查找权限表中是否存在当前的name
 * @param permission 权限列表
 * @param name 路由名称
 * @param child 树的默认子属性
 * @param key 查找的key值
 * @returns
 */
function getPermissionByName(
  permission: any[],
  name: string,
  child: string = "children",
  key: string = "id"
): boolean {
  if (isArray(permission) && !permission.length) return false;

  const permissionList = getTreeMap(permission, child);

  const permissionItem = find(permissionList, (permissionItem) => {
    return permissionItem[key] === name;
  });

  return !!permissionItem;
}

export { setupPermission };
