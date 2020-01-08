<template>
  <v-container class="flex-column" id="container">
    <card-history
      v-for="card in cards"
      :key="card.data().timestamp.seconds"
      :imgSrc="getImgSrc(card.data())"
      :title="format(card.data().timestamp.seconds)"
      :route="card.id"
      :data="card.data()"
      :morning="isMorning(card.data())"
    />
  </v-container>
</template>

<script>
import CardHistory from "../components/CardHistory.vue";
import db from "../fb";
import { auth } from "../fb";

export default {
  components: {
    CardHistory
  },
  data() {
    return {
      cards: []
    };
  },
  created() {
    var entries = [];

    var p1 = db
      .collection("EntryMorning")
      .where("uid", "==", auth.currentUser.uid)
      .get();

    var p2 = db
      .collection("EntryEvening")
      .where("uid", "==", auth.currentUser.uid)
      .get();

    Promise.all([p1, p2]).then(values => {
      var resultMorn = values[0];
      resultMorn.forEach(function(doc) {
        entries.push(doc);
      });
      var resultEv = values[1];
      resultEv.forEach(function(doc) {
        entries.push(doc);
      });
      entries.sort((a, b) => {
        return -1 * (a.data().timestamp.seconds - b.data().timestamp.seconds);
      });
      this.cards = entries;
    });
  },
  methods: {
    format(unix) {
      return new Date(unix * 1000).toLocaleDateString("de-CH");
    },
    getImgSrc(entry) {
      const asset = entry.bedTime ? "sun" : "moon";
      return require(`../assets/${asset}.png`);
    },
    isMorning(entry) {
      return entry.bedTime ? true : false;
    }
  }
};
</script>
<style scoped>
#container {
  padding-bottom: 55px;
}
</style>