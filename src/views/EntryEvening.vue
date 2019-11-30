<template>
  <v-container id="containerEveningEntry">
    <h1 align="center">Abendeintrag erfassen</h1>

    <card-entry-evening
      dark
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :option="card.option"
      :label="card.label"
    ></card-entry-evening>
  </v-container>
</template>

<script>
import CardEntryEvening from "@/components/CardEntryEvening.vue";
export default {
  components: {
    CardEntryEvening
  },
  data() {
    return {
      cards: [
        {
          option: "sliderOption",
          title: "Tagesmüdigkeit:",
          label: "Keine",
          id: "tagesmüdigkeit"
        },
        {
          option: "sliderOption",
          title: "Konzentration:",
          label: "Konzentriert",
          id: "tagesmüdigkeit"
        },
        {
          option: "sliderOption",
          title: "Stimmung:",
          label: "Gut",
          id: "tagesmüdigkeit"
        },
        {
          option: "sliderOption",
          title: "Körperliche Entspanntheit:",
          label: "Entspannt",
          id: "tagesmüdigkeit"
        },
        {
          option: "checkboxOptionSchlaf",
          title: "Tagesschlaf:"
        },
        {
          option: "checkboxOptionGenuss",
          title: "Genussmitttel:"
        },

        { option: "buttonsOption" }
      ]
    };
  }
};
</script>
<style scoped>
#containerEveningEntry {
  padding-bottom: 50px;
}
</style>