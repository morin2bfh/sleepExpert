<!--
In diesem File wird die Ansicht zu der Seite Wissen initialisiert.
Die Daten, welche benötigt werden, werden aus dem Array cards der data() Funktion eingelesen.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
  <v-container class="flex-column justify-space-around" id="container">
    <card-tips
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :textExpanded="card.textExpanded"
    >
      <v-img contain height="30vh" width="300px" :src="card.imgSrc" />
    </card-tips>
  </v-container>
</template>

<script>
// Komponent CardTips wird importiert
import CardTips from "@/components/CardTips.vue";

export default {
  components: {
    // CardTips wird initialisiert
    CardTips
  },
  data: () => ({
    show: false,
    // Definiert die Daten die in die jeweiligen Cards eingefügt werden
    cards: [
      {
        title: "Schlafdruck",
        textExpanded: "Körperlich bedingte Schläfrigkeit, wird umso grösser, je länger man wach ist. Schlaf am Tag führt zu reduziertem Schlafdruck, was in der Nacht zu Ein- oder Durchschlaf-Probleme führt.",
        imgSrc: require("../assets/Individueller_Schlafdruck-1.png")
      },
      {
        title: "Individueller Schlafrhythmus",
        textExpanded: "Es gibt unterschiedliche Rhythmustypen. Wer ein Spättyp ist, kann auch gut nach Mitternacht zu Bett gehen und hat dadurch keinen Schaden – im Gegenteil: Es ist gut, nach dem persönlichen Rhythmus zu leben, wenn die Verpflichtungen es zulassen.",
        imgSrc: require("../assets/Chronotypen.png")
      }
    ]
  })
};
</script>

<style scoped>
  #container {
    padding-bottom: 80px;
  }
</style>
