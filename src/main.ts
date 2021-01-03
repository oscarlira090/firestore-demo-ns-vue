import Vue from 'nativescript-vue'
import App from './components/App.vue'
import VueDevtools from 'nativescript-vue-devtools'
import { firebase } from "@nativescript/firebase";
import RadDataForm from 'nativescript-ui-dataform/vue';
import router from './router';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './fonts/font-awesome.css',
  //'ion': './ionicons.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


Vue.registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);

Vue.use(RadDataForm);

firebase.init({
  persist: false
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
  () => {
    console.log("firebase.init done");
  },
  error => {
    console.log(`firebase.init error: ${error}`);
  }
);

Vue.prototype.$gotToModal = function (to,props) {
  if (!router[to]) return;
  return this.$showModal(router[to], { fullscreen: true, props: props });
};

Vue.prototype.$closeModal = function (context,data) {
  context.$modal.close(data);
};

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
