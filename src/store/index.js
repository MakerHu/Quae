import { createStore } from 'vuex'
import authority from './modules/authority'
import common from './modules/common'

export default createStore({
    modules: {
        common,
        authority,
    }
})