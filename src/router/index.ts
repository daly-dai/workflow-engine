import { createRouter, createWebHashHistory } from "vue-router";
import routes from "@service/router/index";
import { setupRouterGuard } from "./guard/index";

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

setupRouterGuard(router);

export default router;
