import { RouterView } from 'vue-router'

/**
 * 管理端要在左侧生成导航栏的路由
 */
const manageNavRouter =  // 管理端
{
    path: '/manage', 
    component: () => import('@/layout/AppLayout.vue'),
    children: [
        {
            path: 'tools',
            meta: {title: '工具管理', icon: 'Box'},
            component: RouterView,
            children: [
                {
                    path: 'list',
                    meta: {title: '工具列表'},
                    component: () => import('@/views/Test.vue')
                },
                {
                    path: 'me',
                    meta: {title: '我的工具'},
                    component: () => import('@/views/Test.vue')
                },
            ]
        },
        {
            path: 'users',
            meta: {title: '用户管理', icon: 'User'},
            component: RouterView,
            children: [
                {
                    path: 'list',
                    meta: {title: '用户列表'},
                    component: () => import('@/views/UsersList.vue')
                },
            ]
        },
    ]
}
export default manageNavRouter