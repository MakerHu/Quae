const common = {
    namespaced: true,
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state'))['common'] : {
        keyword: ''
    },
    // 唯一可以修改state值的方法，同步阻塞，通过commit调用
    mutations: {
        updateKeyword(state, keyword) {
            state.keyword = keyword
        }
    },
    // 异步调用mutations方法，通过dispatch触发
    actions: {
        asyncUpdateKeyword (context, keyword) {
            context.commit('updateKeyword', keyword)
        }
    },
    // 唯一取值的方法，计算属性
    getters: {
        getKeyword(state) {
            return state.keyword
        }
    }
}

export default common;