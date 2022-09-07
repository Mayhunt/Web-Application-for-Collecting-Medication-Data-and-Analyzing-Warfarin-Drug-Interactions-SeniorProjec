import Vue from 'vue';
import Buefy from 'buefy';
import feather from 'vue-icon';
import VModal from 'vue-js-modal';
import VueGoogleCharts from 'vue-google-charts';
import VueSimpleAlert from 'vue-simple-alert';
// import axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
import 'vue-js-modal/dist/styles.css';
import '../axios';

Vue.use(VueSimpleAlert);
Vue.use(Buefy);
Vue.use(VModal);
Vue.use(feather, 'v-icon');
Vue.use(VueGoogleCharts);
Vue.config.productionTip = false;
Vue.config.productionTip = false;

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response;
//     if (status === 401 || status === 403) {
//       console.warn(localStorage.getItem('token'));
//       axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

//     }
//   },
// );

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
