<template>
  <v-container>
    <card
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :subtitle="card.subtitle"
      :imgSrc="(card.imgSrc)"
      :route="card.route"
    ></card>
  </v-container>
</template>
<script>
import Card from "@/components/Card.vue";
export default {
  components: {
    Card
  },
  data() {
    return {
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
          subtitle:
            "Sieh dir an, welches Schlaffenster für dich vorgesehen ist.",
          imgSrc: require("../assets/Schlaffenster_t.png"),
          route: "/"
        }
      ]
    };
  }
};
</script>