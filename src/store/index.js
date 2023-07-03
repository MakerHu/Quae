import { createStore } from 'vuex'
import authority from './modules/authority'
import tool from './modules/tool'
import common from './modules/common'

export default createStore({
    modules: {
        common,
        authority,
        tool
    }
})