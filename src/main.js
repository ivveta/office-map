import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const vuetify = new Vuetify({});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  vuetify,
}).$mount('#app');
