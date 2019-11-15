<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-bottom-navigation v-model="activeNav" fixed height="50px" class="pa-2" grow dark>
      <v-btn
        :value="route.name"
        v-for="route in routes"
        :key="route.name"
        @click="goTo(route.route)"
      >
        <span class="overline">{{route.name}}</span>
        <v-icon>{{route.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      routes: [
        {
          name: "Start",
          icon: "$vuetify.icons.dashboard",
          route: "/dashboard"
        },
        /* {
          name: "Morgeneintrag",
          icon: "$vuetify.icons.morning",
          route: "/entryMorning"
        },
        {
          name: "Abendeintrag",
          icon: "$vuetify.icons.evening",
          route: "/entryEvening"
        },*/
        { name: "Verlauf", icon: "$vuetify.icons.history", route: "/history" },
        { name: "Statistik", icon: "$vuetify.icons.stats", route: "/stats" },
        { name: "Info", icon: "$vuetify.icons.info", route: "/info" },
        { name: "Besipiele", icon: "$vuetify.icon.book", route: "/ex" }
      ],
      activeNav: ""
    };
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style scoped>
.v-content {
  background-color: #424242;
}
</style>
