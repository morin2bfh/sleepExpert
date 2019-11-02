import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      dashboard: 'mdi-dashboard',
      morning: 'mdi-wb-sunny',
      evening: 'mdi-nights_stay',
      history: 'mdi-history',
      stats: 'mdi-show_chart',
      info: 'mdi-info',
    },
  },
});
