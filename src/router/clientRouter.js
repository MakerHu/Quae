import { RouterView } from 'vue-router'

/**
 * 客户端端普通路由（不在左侧生成导航栏的路由）
 */
const clientRouter =  // 客户端
{
    path: '/user', 
    component: () => import('@/layout/HeaderAsideLayout.vue'),
    children: [
        {
            path: 'tool-editor',
            meta: {title: '工具编辑器'},
            component: () => import('@/views/WhitePage.vue')
        },
        {
            path: 'tool-editor/:id',
            props: true,    // 将路径参数转换为组件props
            meta: {title: '工具编辑器'},
            component: () => import('@/views/WhitePage.vue')
        },
    ]
    
}
export default clientRouter