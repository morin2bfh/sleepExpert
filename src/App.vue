<template>
  <v-app>
    <v-app-bar v-if="auth.currentUser" app dark height="50px" id="appBar">
      <v-toolbar-title class="headline text-uppercase">
        {{ activeTitle }} 
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-bottom-navigation
      v-if="auth.currentUser"
      v-model="activeNav"
      fixed
      height="50px"
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
  data() {
    return {
      routes: [
        {
          name: "Dashboard",
          icon: "$vuetify.icons.dashboard",
          route: "/dashboard"
        },
        { 
          name: "Verlauf",
          icon: "$vuetify.icons.history",
          route: "/history"
        },
        { 
          name: "Statistik",
          icon: "$vuetify.icons.stats",
          route: "/stats"
        },
        {
          name: "Info",
          icon: "$vuetify.icons.info",
          route: "/info"
        },
        {
          name: "Besipiele", 
          icon: "$vuetify.icon.book",
          route: "/ex"
        }
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
#appBar{
  justify-content: center !important;
  display: flex;
}
</style>