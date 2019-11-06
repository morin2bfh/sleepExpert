<template>
    <v-app>
    <v-content>
        <h1>Dashboard</h1>
      <router-view></router-view>
      <Card> </Card>
    </v-content>
    </v-app>
</template>
<script>
export default {
     data() {
    return {
      routes: [
        {
          name: "Dashboard",
          icon: "$vuetify.icons.dashboard",
          route: "/dashboard"
        },
        {
          name: "Morgeneintrag",
          icon: "$vuetify.icons.morning",
          route: "/entryMorning"
        },
        {
          name: "Abendeintrag",
          icon: "$vuetify.icons.evening",
          route: "/entryEvening"
        },
        { name: "Verlauf", icon: "$vuetify.icons.history", route: "/history" },
        { name: "Statistik", icon: "$vuetify.icons.stats", route: "/stats" },
        { name: "Info", icon: "$vuetify.icons.info", route: "/info" }
      ],
    }
    }
};
</script>