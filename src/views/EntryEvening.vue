<template>
  <v-container>
    <h1 align="center">Abendeintrag erfassen</h1>

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
          title: "Tagesmüdigkeit:",
          label: "Keine"
        },
        {
          option: "sliderOption",
          title: "Konzentration:",
          label: "Konzentriert"
        },{
          option: "sliderOption",
          title: "Stimmung:",
          label: "Gut"
        },
        {
          option: "sliderOption",
          title: "Körperliche Entspanntheit:",
          label: "Entspannt"
        },
        { 
        option: "checkboxOptionSchlaf", 
        title: "Tagesschlaf:" },
         { 
            option: "checkboxOptionGenuss", 
         title: "Genussmitttel:" },
         
        { option: "buttonsOption" }
      ]
    };
  }
};
</script>