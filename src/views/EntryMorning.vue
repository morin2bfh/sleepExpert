<template>
  <v-container>
    <h1 align="center">Morgeneintrag erfassen</h1>

    <card-entry
      dark
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :option="card.option"
      :label="card.label"
    >
  </card-entry>
  </v-container>
</template>

<script>
import CardEntry from "@/components/CardEntry.vue";
export default {
  components: {
    CardEntry
  },

  data() {
    return {
      cards: [
        {
          option: "sliderOption",
          title: "Schlafqualität:",
          label: "Gut"
        },
        {
          option: "sliderOption",
          title: "Gefühl des Erholtseins:",
          label: "Gut"
        },
        {
          option: "sliderOption",
          title: "Müdigkeit beim Zubettgehen:",
          label: "Keine"
        },
        { option: "clockOption", 
        title: "Zu Bett gegangen um:", 
        label: "Uhrzeit" },

        { option: "clockOption", 
        title: "Licht gelöscht um:", 
        label: "Uhrzeit" },

        { option: "hhmmOption", 
        title: "Geschätzte Einschlafdauer:", 
        label: "hh:mm" },

        { option: "numbersOption", 
        title: "Wie oft aufgewacht:", 
        label: "Anzahl" },
        {
          option: "hhmmOption",
          title: "Wie lange wach in der Nacht:",
          label: "hh:mm"
        },
        {
          option: "clockOption",
          title: "Endgültig aufgewacht um:",
          label: "Uhrzeit"
        },
        {
          option: "clockOption",
          title: "Morgens aufgestanden um:",
          label: "Uhrzeit"
        },
        { option: "checkboxOption", 
        title: "Schlafmittel genommen:" },
        { option: "buttonsOption" }
      ]
    };
  }
};
</script>