<template>
  <v-app>
    <v-toolbar v-if="auth.currentUser" dark fixed height="50px" id="toolbar">
      <v-toolbar-title class="headline text-uppercase">{{activeTitle}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-bottom-navigation
      v-if="auth.currentUser"
      v-model="activeNav"
      fixed
      height="50px"
      class="pa-2"
      grow
      dark
    >
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
import { bus } from "./main";
import { auth } from "./fb";

export default {
  name: "App",
  components: {},
  data() {
    return {
      routes: [
        {
          name: "Dashboard",
          icon: "$vuetify.icons.dashboard",
          route: "/dashboard"
        },
        { name: "Verlauf", icon: "$vuetify.icons.history", route: "/history" },
        { name: "Statistik", icon: "$vuetify.icons.stats", route: "/stats" },
        { name: "Info", icon: "$vuetify.icons.info", route: "/info" },
        { name: "Besipiele", icon: "$vuetify.icon.book", route: "/ex" }
      ],
      activeNav: "",
      activeTitle: "Dashboard"
    };
  },
  created() {
    bus.$on("changedRoute", data => {
      this.goTo(data);
    });
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
      this.activeTitle = this.$router.currentRoute.name;
    }
  },
  computed: {
    auth() {
      return auth;
    }
  }
};
</script>
<style scoped>
.v-content {
  background-color: #424242;
}
header {
  max-height: 50px;
}
#toolbar {
  justify-content: center !important;
  display: flex;
}
</style>
