<!--
In diesem File wird die Ansicht zu den Tipps initialisiert.
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
    />
  </v-container>
</template>

<script>
// Komponent der Seite Tipps werden importiert
import CardTips from "@/components/CardTips.vue";

export default {
  components: {
    // CardTips wird initialisiert
    CardTips,
  },
  data: () => ({
    show: false,
    // Definiert die Daten die in die jeweiligen Cards eingefügt werden
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
    padding-bottom: 80px;
  }
</style>
