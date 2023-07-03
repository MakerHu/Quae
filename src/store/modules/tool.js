import { getToolsPage } from '@/apis/ToolApi'
import { ElMessage } from 'element-plus';

const tool = {
    namespaced: true,
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state'))['tool'] : {
        
    },
    // 唯一可以修改state值的方法，同步阻塞，通过commit调用
    mutations: {
    },
    // 异步调用mutations方法，通过dispatch触发
    actions: {
    },
    // 唯一取值的方法，计算属性
    getters: {
    }
}

export default tool;