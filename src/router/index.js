// 此文件专门负责项目的路由

import { createRouter, createWebHistory } from "vue-router";
// import { ElMessage } from 'element-plus'
// import manageRouter from './manageRouter'
// import clientRouter from './clientRouter'
// import manageNavRouter from './manageNavRouter'
// import clientNavRouter from './clientNavRouter'
// import commonRouter from './commonRouter'
// import headerRouter from './headerRouter'
import headerAsideRouter from "./headerAsideRouter";

import authority from "@/store/modules/authority.js";

// 引入组件
// import Tool from '@/views/Tool.vue'
// const Tool = ()=> import('@/views/Tool.vue')

const routes = [
  // // 不带导航栏的公共部分
  // commonRouter,
  // // 带有头部导航栏的路由
  // headerRouter,
  // // 管理端
  // manageRouter,
  // manageNavRouter,

  // // 客户端
  // clientRouter,
  // clientNavRouter,

  headerAsideRouter,
];

// 创建并暴露一个路由器
const router = createRouter({
  // mode: 'history',    // 路由模式，该模式不会在地址中显示井号#
  history: createWebHistory(), // 路由模式，该模式不会在地址中显示井号#
  routes,
});

/**
 * 递归便利添加router配置
 */
let autoRouter = {};
const genRouter = (menuItems) => {
  menuItems.forEach((item, index) => {
    if (!autoRouter[item.layout]) {
      autoRouter[item.layout] = {
        path: "/",
        name: "Auto" + item.layout,
        component: () => import(`../layout/${item.layout}.vue`),
        children: [], // TODO redirect
      };
    }

    autoRouter[item.layout].children.push({
      path: item.path,
      name: item.name,
      meta: { title: item.title, icon: item.icon, showMenu: item.showMenu },
      component: () => import(`../views/${item.component}.vue`),
    });

    genRouter(item.children);
  });

  for (let key in autoRouter) {
    if (autoRouter.hasOwnProperty(key)) {
      let value = autoRouter[key];
      router.addRoute(value);
    }
  }
};

// 全局前置守卫，这里可以加入用户登录判断
router.beforeEach((to, from, next) => {
  // 继续前进 next()
  // 返回 false 以取消导航

  const user = authority.state.user;
  // TODO 权限管理
  if (!user.routes.length) {
    // TODO 重新登录
    next({ path: "/login" });
  } else {
    // 根据autoRouter对象是否为空判断是否刷新了页面
    if (Object.keys(autoRouter).length === 0) {
      // 根据配置内容动态添加路由
      genRouter(user.routes);
      // 动态添加路由后要重定向到原路由才能生效
      next(to.fullPath);
    } else {
      next();
    }
  }

  // TODO 404跳转
});

// 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to, from) => {
  const _title = to.meta.title;
  if (_title) {
    window.document.title = _title;
  }
});

export default router;
