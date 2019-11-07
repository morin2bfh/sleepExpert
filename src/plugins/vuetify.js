import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      dashboard: 'mdi-home',
      morning: 'mdi-white-balance-sunny',
      evening: 'mdi-weather-night',
      history: 'mdi-history',
      stats: 'mdi-chart-line',
      info: 'mdi-information',
      date: 'mdi-calendar',
    },
  },
});
