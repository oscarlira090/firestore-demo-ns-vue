import mutations from './mutations.js'
import * as actions from './actions.js'
import * as getters from './getters'
import { ObservableArray } from "tns-core-modules/data/observable-array";

const CustomerModule = {
  namespaced: true,
  state: {
    customer: {
      id: '',
      first_name: '',
      last_name: ''
    },
    customers: new ObservableArray([]),
  },
  mutations,
  actions,
  getters,
  strict: true,
}

export default CustomerModule;