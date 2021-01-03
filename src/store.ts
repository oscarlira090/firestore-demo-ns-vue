import Vue from 'vue';
import Vuex from 'vuex';
import customerModule from './store/customers/module.js'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    customer:customerModule,
  },
});
export default store;
