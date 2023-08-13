// import { RouterView } from 'vue-router'

// /**
//  * 带有头部导航栏的页面路由
//  */
// const headerRouter =
// {
//     path: '/',
//     component: () => import('@/layout/HeaderMainLayout.vue'),
//     children: [
//         {
//             path: '',
//             redirect: '/tools'
//         },
//         {
//             path: 'tools',
//             meta: { title: '首页', requiresAuth: false, goBack: false },
//             component: () => import('@/views/ToolCards.vue')
//         },
//         {
//             path: 'tools/:toolId',
//             props: true,    // 将路径参数转换为组件props
//             meta: { title: '详情页', requiresAuth: false },
//             component: () => import('@/views/WhitePage.vue')
//         },
//     ]

// }
// export default headerRouter