<template>
  <v-container class="flex-column" id="container">
  <card-history
      v-for="card in cards"
      :key="card.title"
      :imgSrc="card.imgSrc"
      :title="card.title"
      :route="card.route"
    />
 </v-container>
</template>

<script>
import CardHistory from '../components/CardHistory.vue'

export default {
  components:{
    CardHistory,
  },
   data() {
    return {
      cards: [
        {
          imgSrc: require("../assets/sun.png"),
          title: "12. Dezember 2019",
          route: "/entryMorning",
        },
        {
          imgSrc: require("../assets/moon.png"),
          title: "12. Dezember 2019",
          route: "/entryEvening",
        },{
          imgSrc: require("../assets/sun.png"),
          title: "11. Dezember 2019",
          route: "/entryMorning",
        },
        {
          imgSrc: require("../assets/moon.png"),
          title: "11.12.2019",
          route: "/entryEvening",
        },
      ]
    };
   }
};  
</script>
<style scoped>
</style>