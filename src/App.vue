<template>
  <v-app>
    <v-app-bar v-if="auth.currentUser" app dark height="50px" widht="100%" id="appBar">
      <v-toolbar-title class="headline text-uppercase">{{ activeTitle }}</v-toolbar-title>
      <v-btn icon v-if="this.activeTitle=='Dashboard'" @click="logout()">
        <v-icon>$vuetify.icons.logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-bottom-navigation v-if="auth.currentUser" v-model="activeNav" fixed height="50px" grow dark>
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
      this.$router.push(route).then(() => {
        this.activeTitle = this.$router.currentRoute.name;
      });
    },
    logout() {
      auth.signOut().then(() => {
        this.$router.push("/login");
      });
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
#appBar {
  justify-content: center !important;
  display: flex;
}
</style>