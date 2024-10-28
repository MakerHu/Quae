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
            redirect: '/home',
        },
        {
            path: 'login',
            meta: { title: '登录 | Quae', requiresAuth: false },
            component: () => import('@/views/Login.vue')
        },
        {
            path: 'register',
            meta: { title: '注册 | Quae', requiresAuth: false },
            component: () => import('@/views/Register.vue')
        },
    ]

}
export default commonRouter