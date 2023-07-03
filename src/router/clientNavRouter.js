import { RouterView } from 'vue-router'

/**
 * 管理端要在左侧生成导航栏的路由
 */
const clientNavRouter =  // 客户端
{
    path: '/user', 
    component: () => import('@/layout/AppLayout.vue'),
    children: [
        {
            path: 'profile',
            meta: {title: '个人中心', icon: 'User'},
            component: () => import('@/views/Profile.vue')
        },
        {
            path: 'tools',
            meta: {title: '我的工具', icon: 'Box'},
            component: () => import('@/views/MyTools.vue')
        },
    ]
    
}
export default clientNavRouter