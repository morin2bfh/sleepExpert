<!--
In diesem File wird das Dashboard initialisiert.
Die Daten, welche benötigt werden, werden aus dem Array cards der data() Funktion eingelesen.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
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
import Card from "@/components/Card.vue";

export default {
  components: {
    Card
  },
  data: () => ({
    cards: [
      {
        title: "Morgeneintrag",
        subtitle:
          "Erfasse einen neuen Eintrag, um deine Schlafdauer zu dokumentieren.",
        imgSrc: require("../assets/sun.png"),
        route: "/entryMorning", 
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
        route: "/sleepingWindow"
      }
    ]
  })
};
</script>

<style scoped>
#container {
  height: calc(100% - 100px);
}
</style>