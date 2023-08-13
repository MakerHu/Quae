import { RouterView } from "vue-router";

/**
 * 管理端要在左侧生成导航栏的路由
 */
const testRouter =
  // 管理端
  {
    path: '/',
    name: 'TestRouter',
    component: () => import("@/layout/HeaderAsideLayout.vue"),
    children: [
      {
        path: "/:testrouter",
        meta: { title: "测试2" },
        component: () => import("@/views/WhitePage.vue"),
      },
      {
        path: "/testrouter/demo",
        meta: { title: "测试2" },
        component: () => import("@/views/Demo.vue"),
      },
    ],
  };
export default testRouter;
