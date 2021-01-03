import * as types from './mutation-types'

const mutations = {
    [types.RESET](state,data) {
        state.customers = []
    },
    [types.SET](state, item) {
        state.customer = item
    },
    [types.ADD](state, item) {
        state.customers.push(item)
    },
    [types.UPDATE](state, item) {
        //state.customers.push(item)
    },
    [types.REMOVE](state, item) {
        let index = state.customers.indexOf(item);
        state.customers.splice(index,1);
    },
}

export default mutations;