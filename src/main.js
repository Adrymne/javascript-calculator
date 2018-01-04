import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import store from './store';

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
