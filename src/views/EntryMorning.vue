<template>
  <v-container id="containerMorningEntry">
    <h1 prepend-inner-icon="$vuetify.icons.clock"
         align="center" >Morgeneintrag erfassen</h1>

    <card-entry-morning
      dark
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :option="card.option"
      :label="card.label"
      :id ="card.id"
    >
  </card-entry-morning>
  </v-container>
</template>

<script>
import CardEntryMorning from "@/components/CardEntryMorning.vue";
export default {
  components: {
    CardEntryMorning
  },

  data() {
    return {
      cards: [
        {
          option: "sliderOption",
          title: "Schlafqualität:",
          label: "Gut",
          id: "sleepquality",
        },
        {
          option: "sliderOption",
          title: "Gefühl des Erholtseins:",
          label: "Gut",
          id: "feeling-of-recovery",
        },
        {
          option: "sliderOption",
          title: "Müdigkeit beim Zubettgehen:",
          label: "Keine",
          id: "tiredness-bed",
        },
        { option: "clockOption", 
        title: "Zu Bett gegangen um:", 
        label: "Uhrzeit",
        id: "gone-to-bed",
        },

        { option: "clockOption", 
        title: "Licht gelöscht um:", 
        label: "Uhrzeit",
        id: "light-extinguished",},

        { option: "hhmmOption", 
        title: "Geschätzte Einschlafdauer:", 
        label: "hh:mm", 
        id: "sleep-duration",},

        { option: "numbersOption", 
        title: "Wie oft aufgewacht:", 
        label: "Anzahl",
        id: "number-woke-up", },
        {
          option: "hhmmOption",
          title: "Wie lange wach in der Nacht:",
          label: "hh:mm",
          id: "awake-in-night",
        },
        {
          option: "clockOption",
          title: "Endgültig aufgewacht um:",
          label: "Uhrzeit",
          id: "woke-up",
        },
        {
          option: "clockOption",
          title: "Morgens aufgestanden um:",
          label: "Uhrzeit",
          id: "arisen",
        },
        { option: "checkboxOption", 
        title: "Schlafmittel genommen:" },
        { option: "buttonsOption" }
      ]
    };
  }
};
</script>
<style scoped>
  #containerMorningEntry{
    padding-bottom: 50px;
  }
</style>