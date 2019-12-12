<template>
  <v-container class="d-flex flex-column justify-space-around" id="container">
    <card-tipps
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :textExpanded="card.textExpanded"
    />
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
        title: "Keine koffeinhaltigen Getränke am Abend",
        textExpanded: "Koffein zählt als 'Wachmacher', was ungeeignet ist, um einzuschlafen.",
      },
       {
        title: "Alkohol ist kein Schlafmittel",
        textExpanded: "Alkohol hilft zwar beim Einschlafen, stört jedoch die Schlafphasen",
      },
      {
        title: "Regelmässige körperliche Aktivität",
        textExpanded: "Koffein zählt als 'Wachmacher', was ungeeignet ist, um einzuschlafen.",
      },
      {
        title: "Tagesschlaf versuchen zu reduzieren",
        textExpanded: "Koffein zählt als 'Wachmacher', was ungeeignet ist, um einzuschlafen.",
      },
      {
        title: "Nicht auf die Uhr/Wecker schauen in der Nacht",
        textExpanded: "Koffein zählt als 'Wachmacher', was ungeeignet ist, um einzuschlafen.",
      },
      {
        title: "Morgendliche Lichtexposition",
        textExpanded: "Koffein zählt als 'Wachmacher', was ungeeignet ist, um einzuschlafen.",
      },
      {
        title: "Licht abends reduzieren",
        textExpanded: "Koffein zählt als 'Wachmacher', was ungeeignet ist, um einzuschlafen.",
      },
      {
        title: "Gestaltung der gewonnenen Zeit",
        textExpanded: "Koffein zählt als 'Wachmacher', was ungeeignet ist, um einzuschlafen.",
      },
    ]
  })
};
</script>
<style scoped>
#container {
  height: calc(100% - 100px);
}
</style>
