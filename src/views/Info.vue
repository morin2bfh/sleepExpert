<!--
In diesem File wird die Ansicht zu der Seite Info initialisiert.
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
// Komponent Card wird importiert
import Card from "@/components/Card.vue";

export default {
  components: {
    // Cards wird initialisiert
    Card
  },
  data: () => ({
    // Definiert die Daten die in die jeweiligen Cards eingefügt werden
      cards: [
      {
        title: "Übungen",
        subtitle: "Übungen rund um das Thema Schlaf",
        imgSrc: require("../assets/meditation.png"),
        route: "/exercises", 
      },
      {
        title: "Wissen",
        subtitle:"Wissen rund um das Thema Schlaf",
        imgSrc: require("../assets/questionmark.png"),
        route: "/knowledge"
      },
      {
        title: "Tipps",
        subtitle: "Tipps rund ums Thema Schlaf",
        imgSrc: require("../assets/lamp.png"),
        route: "/tips"
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
