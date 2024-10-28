import { RouterView } from "vue-router";

/**
 * 管理端要在左侧生成导航栏的路由
 */
const headerAsideRouter =
  // 管理端
  {
    path: '/',
    name: 'HeaderAsideRouter',
    component: () => import("@/layout/HeaderAsideLayout.vue"),
    children: [
      {
        path: "home",
        meta: { title: "首页" },
        component: () => import("@/views/WhitePage.vue"),
      },
      // {
      //   path: "/test",
      //   meta: { title: "测试2" },
      //   component: () => import("@/views/WhitePage.vue"),
      // },
      // {
      //   path: "/:lll",
      //   meta: { title: "测试2" },
      //   component: () => import("@/views/WhitePage.vue"),
      // },
      {
          path: "/404",
          component: () => import("@/views/ErrorPage.vue")
      },
      // {
      //     path: "/:catchAll(.*)", // 不识别的path自动匹配404
      //     redirect: '/404',
      // },
    ],
  };
export default headerAsideRouter;
