// import { RouterView } from 'vue-router'

// /**
//  * 管理端要在左侧生成导航栏的路由
//  */
// const manageNavRouter =  // 管理端
// {
//     path: '/manage', 
//     component: () => import('@/layout/HeaderAsideLayout.vue'),
//     children: [
//         {
//             path: 'sys',
//             meta: {title: '系统使用', icon: 'Box'},
//             component: RouterView,
//             children: [
//                 {
//                     path: 'components',
//                     meta: {title: '组件库'},
//                     component: () => import('@/views/Demo.vue')
//                 },
//             ]
//         },
//         {
//             path: 'level01',
//             meta: {title: '一级菜单01', icon: 'Setting'},
//             component: RouterView,
//             children: [
//                 {
//                     path: 'level01-01',
//                     meta: {title: '二级菜单01'},
//                     component: () => import('@/views/WhitePage.vue')
//                 },
//                 {
//                     path: 'level01-02',
//                     meta: {title: '二级菜单02'},
//                     component: () => import('@/views/WhitePage.vue'),
//                     children: [
//                         {
//                             path: 'level03-01',
//                             meta: {title: '三级菜单01'},
//                             component: () => import('@/views/WhitePage.vue')
//                         },
//                         {
//                             path: 'level03-02',
//                             meta: {title: '三级菜单02'},
//                             component: () => import('@/views/WhitePage.vue')
//                         },
//                     ]
//                 },
//             ]
//         },
//         {
//             path: 'level02',
//             meta: {title: '一级菜单02', icon: 'User'},
//             component: RouterView,
//             children: [
//                 {
//                     path: 'level02-01',
//                     meta: {title: '用户列表'},
//                     component: () => import('@/views/UsersList.vue')
//                 },
//             ]
//         },
//     ]
// }
// export default manageNavRouter