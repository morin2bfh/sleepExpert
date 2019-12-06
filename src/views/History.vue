<template>
 <v-container id="containerHistory">
  <card-history
      v-for="card in cards"
      :key="card.title"
      :imgSrc="card.imgSrc"
      :title="card.title"
      :option="card.option"
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
          option: "morningEntry",
          title: "getDateFromDBMorning",
          route: "/entryMorning"
        },
        {
          imgSrc: require("../assets/moon.png"),
          option: "eveningEntry",
          title: "getDateFromDBEvening",
          route: "/entryEvening"
        },
      ]
    };
   }
};  
</script>
