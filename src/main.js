import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.config.devtools = true;

export const bus = new Vue();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("yay!"))
    .catch(() => console.log("nooo :("));
}