<template>
  <v-container class="flex-column" id="container">
    <card-history
      v-for="card in cards"
      :key="card.timestamp.seconds"
      :imgSrc="getImgSrc(card)"
      :title="format(card.timestamp.seconds)"
      :route="card.route"
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
        entries.push(doc.data());
      });
      var resultEv = values[1];
      resultEv.forEach(function(doc) {
        entries.push(doc.data());
      });
      entries.sort(function(a, b) {
        return -1 * (a.timestamp.seconds - b.timestamp.seconds);
      });
      this.cards = entries;
    });
  },
  methods: {
    format(unix) {
      return new Date(unix * 1000).toLocaleDateString("de-DE");
    },
    getImgSrc(entry) {
      var src = "";
      if (entry.bedTime) {
        src = require("../assets/sun.png");
      } else if (entry.concentration) {
        src = require("../assets/moon.png");
      }
      return src;
    }
  }
};
</script>
<style scoped>
</style>