<template>
  <v-container class="flex-column justify-space-around" id="container">
    <card-tipps
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :textExpanded="card.textExpanded"
    >
      <v-img class="white--text align-end" contain height="15vh" :src="card.imgSrc">
        <v-overlay absolute opacity="0" z-index="-10"></v-overlay>
      </v-img>
    </card-tipps>
  </v-container>
</template>

<script>
import CardTipps from "@/components/CardTipps.vue";

export default {
  components: {
    CardTipps,
  },
  data: () => ({
    cards: [
      {
        title: "Allgemeine Informationen",
        textExpanded: "Übungen im Tagesablauf fixieren.\nTechnik im Sitzen lernen.\nMöglichst ohne Hilfen lernen.\nWenn etwas während der Übung stört, ändere es (z.B.: Jucken).\nGedanklicher abschweif während der Übung ist normal, einfach zurückkehren.\nErst richtig Üben, dann für das richtige einsetzten.\nÜbungen kürzen oder verlängern, je nach Bedürfnis.\nEntspannungsphase ist ~3x so lang wie Anspannungsphase.\nGesamte Übung dauer 10-15 Minuten",
        imgSrc: require("../assets/meditation.png"),
      },
      {
        title: "Arme",
        textExpanded: "Beide Hände zu Fäusten ballen → Anspannen der Hände und Unterarme. Nun Hände zur Schulter führen → Anspannen der Oberarme",
        imgSrc: require("../assets/Arm.png"),
      },
      {
        title: "Beine",
        textExpanded:"Fersen auf den Boden pressen, Zehen nach oben richten, Unterschenkel, Oberschenkel und Gesässmuskeln anspannen",
        imgSrc: require("../assets/Beine.png"),
      },
      {
        title: "Brust",
        textExpanded: "Entspannen, ruhig und tief einatmen. Luft kurz anhalten → Anspannen der Brustmuskulatur. Wieder ruhig atmen und Entspannung fühlen",
        imgSrc: require("../assets/Brust_t.png"),
      },
      {
        title: "Nacken und Hals",
        textExpanded: "Kopf nach hinten drücken → Anspannen des Nackens. Kopf nach vorne auf die Brust drücken → Anspannen der Halsmuskeln",
        imgSrc: require("../assets/Hals_t.png"),
      },
    ]
  })
};
</script>

<style scoped>
  #container {
    padding-bottom: 80px;
  }
  #layoutCards {
    padding: 10px;
  }
</style>
