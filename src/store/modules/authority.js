import { login, register } from '@/apis/UserApi'

const authority = {
    namespaced: true,
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state'))['authority'] : {
        user: {
            id: -1,
            uname: 'KW',
            password: '',
        }
    },
    // 唯一可以修改state值的方法，同步阻塞，通过commit调用
    mutations: {
        updateUser(state, user) {
            state.user = user
        }
    },
    // 异步调用mutations方法，通过dispatch触发
    actions: {
        asyncUpdateUser(context, user) {
            context.commit('updateUser', user)
        },
        asyncLogin(context, user) {
            return new Promise((resolve, reject) => {
                login(user).then(res => {
                    context.commit('updateUser', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        asyncRegister(context, user) {
            return new Promise((resolve, reject) => {
                register(user).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    },
    // 唯一取值的方法，计算属性
    getters: {
        getUser(state) {
            return state.user
        }
    }
}

export default authority;