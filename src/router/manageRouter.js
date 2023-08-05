import { RouterView } from 'vue-router'

/**
 * 管理端普通路由（不在左侧生成导航栏的路由）
 */
const manageRouter =  // 管理端
{
    path: '/manage', 
    component: () => import('@/layout/HeaderAsideLayout.vue'),
    children: [
        {
            path: 'users',
            meta: {title: '用户信息1'},
            component: RouterView,
            children: [
                {
                    path: ':uid/profile',
                    props: true,    // 将路径参数转换为组件props
                    meta: {title: '用户信息'},
                    component: () => import('@/views/UserMsg.vue')
                },
            ]
        },
        {
            path: 'test',
            meta: {title: '测试1'},
            component: RouterView,
            children: [
                {
                    path: 'list',
                    meta: {title: '测试2'},
                    component: () => import('@/views/Demo.vue')
                },
            ]
        },
    ]
}
export default manageRouter