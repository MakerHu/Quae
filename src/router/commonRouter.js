import { RouterView } from 'vue-router'

/**
 * 不带导航栏的页面路由
 */
const commonRouter =
{
    path: '/',
    component: RouterView,
    children: [
        {
            path: '',
            redirect: '/tools'
        },
        {
            path: 'test',
            meta: { title: '测试页面' },
            component: () => import('@/views/Test.vue')
        },
        {
            path: 'login',
            meta: { title: '登录 | 可微工具箱', requiresAuth: false },
            component: () => import('@/views/Login.vue')
        },
        {
            path: 'register',
            meta: { title: '注册 | 可微工具箱', requiresAuth: false },
            component: () => import('@/views/Register.vue')
        },
    ]

}
export default commonRouter