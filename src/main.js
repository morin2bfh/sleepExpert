/*
In diesem File wird die Applikation initialisiert. die genutzten plugins wie vuetify
und der vue-interne router werden registriert
Zudem wir ein Serviceworker registriert, welcher ausgeführt wird, wenn ein Nutzer die 
Anwendung zum Startbildschirm seines Smartphones hinzufügt.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
*/

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
  navigator.serviceWorker.register("/sw.js").then().catch();
}