<template>
  <v-container class="d-flex flex-column justify-space-around" id="container">
    <card
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :subtitle="card.subtitle"
      :imgSrc="card.imgSrc"
      :route="card.route"
    />
  </v-container>
</template>
<script>
import { auth } from "../fb";
import Card from "@/components/Card.vue";
export default {
  components: {
    Card
  },
  created: function() {
    var user = auth.currentUser;
    if (user == null) {
      this.$router.push("/login");
    }
  },
  data: () => ({
    cards: [
      {
        title: "Morgeneintrag",
        subtitle:
          "Erfasse einen neuen Eintrag, um deine Schlafdauer zu dokumentieren.",
        imgSrc: require("../assets/sun.png"),
        route: "/entryMorning"
      },
      {
        title: "Abendeintrag",
        subtitle:
          "Erfasse einen neuen Eintrag, um dein Befinden tagüber zu dokumentieren.",
        imgSrc: require("../assets/moon.png"),
        route: "/entryEvening"
      },
      {
        title: "Schlaffenster",
        subtitle: "Sieh dir an, welches Schlaffenster für dich vorgesehen ist.",
        imgSrc: require("../assets/Schlaffenster_t.png"),
        route: "/"
      }
    ]
  })
};
</script>
<style scoped>
#container {
  height: calc(100% - 50px);
}
</style>
