<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-bottom-navigation v-model="activeNav" grow>
      <v-btn class="pt-5" :value=route.name v-for="route in routes" :key="route.name" router :to="route.route" >
        <span class="overline">{{route.name}}</span>
        <v-icon>{{route.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data (){
    return{
      routes: [
        {name: "Dashboard", icon: '$vuetify.icons.dashboard', route: "/dashboard"},
        {name: "Morgeneintrag", icon: '$vuetify.icons.morning', route:"/entryMorning"},
        {name: "Abendeintrag", icon: '$vuetify.icons.evening', route:"/entryEvening"},
        {name: "Verlauf", icon: '$vuetify.icons.history', route:"/history"},
        {name: "Statistik", icon: '$vuetify.icons.stats', route:"/stats"},
        {name: "Info", icon: '$vuetify.icons.info', route:"/info"},
      ],
      activeNav: '',

    }
  },
};
</script>
