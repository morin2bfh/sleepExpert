<template>
  <v-container class="flex-column justify-space-around" id="container">
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
    show: false,
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
        textExpanded: "Der Körper muss ermüden, damit er schlafen kann. Aber Sport kurz vor dem Schlafen aktiviert einige Menschen, daher eher früher planen.",
      },
      {
        title: "Tagesschlaf versuchen zu reduzieren",
        textExpanded: "Koffein zählt als 'Wachmacher', was ungeeignet ist, um einzuschlafen.",
      },
      {
        title: "Nicht auf die Uhr/Wecker schauen in der Nacht",
        textExpanded: "Kann dazu führen, dass man sich noch mehr unter Druck setzt (z.B.: Jetzt ist es schon 4 Uhr, jetzt hab ich nur noch 2 Stunden…')",
      },
      {
        title: "Morgendliche Lichtexposition",
        textExpanded: "Wichtigster Zeitgeber für unseren Körper, setzt unseren Biorhythmus. Z.B.: Tageslichtlampen",
      },
      {
        title: "Licht abends reduzieren",
        textExpanded: "Blaulichtfilter auf dem Smartphone nutzen.",
      },
      {
        title: "Schlafumgebung günstig gestalten",
        textExpanded: "Z.B.: Dunkel, ruhig, angenehme Temperatur",
      },
    ]
  })
};
</script>
<style scoped>
#container {
  height: calc(100% - 150px);
  padding-bottom: 80px;
}
</style>
