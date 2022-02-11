import type { Router } from "vue-router";
import { commonInterceptorFun } from "./common";
import { setupPermission } from "./permission";
export function setupRouterGuard(router: Router) {
  commonInterceptorFun(router);
  setupPermission(router);
}
