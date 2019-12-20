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
    Card,
  },
  data: () => ({
    cards: [
      {
        title: "Übungen",
        subtitle: "Übungen rund um das Thema Schlaf",
        imgSrc: require("../assets/meditation.png"),
        route: "/Uebungen", 
      },
      {
        title: "Wissen",
        subtitle:"Wissen rund um das Thema Schlaf",
        imgSrc: require("../assets/questionmark.png"),
        route: "/Wissen"
      },
      {
        title: "Tipps",
        subtitle: "Tipps rund ums Thema Schlaf",
        imgSrc: require("../assets/lamp.png"),
        route: "/tipps"
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
