<!--
In diesem File wird die Ansicht eines spezifischen Verlaufseintrages definiert.
Die Daten werden von Eltern-Knoten "History.vue" an diesen Component gesendet.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->

<template>
  <v-container id="containerHistoryEveningEntry">
    <v-form ref="form" v-model="valid" lazy-validation>
      <card-entry-evening
        dark
        v-for="card in mappedCards"
        :key="card.title"
        :title="card.title"
        :option="card.option"
        :label="card.label"
        :id="card.id"
        :value="card.value"
        :disabled="true"
      ></card-entry-evening>
    </v-form>
  </v-container>
</template>

<script>
import CardEntryEvening from "@/components/CardEntryEvening.vue";
import entryItems from "@/config/eveningEntryConfig.js";

export default {
  components: {
    CardEntryEvening
  },
  created() {
    var data = this.$route.params.data;

    //hier werden die Daten die übergeben wurden in die von der App verwendete Datenstruktur umgeformt.
    this.mappedCards = entryItems.map(item => {
      return {
        //es werden sämtliche administrativen Daten aud dem File "config/morningEntryConfig.js" übernommen
        ...item,
        //zusätzlich wird ein Wert definiert. Falls dieser Wert
        //eine Repräsentation einer Checkbox darstellt, muss der Wert noch umgeformt werden.
        value:
          item.option != "checkboxOption"
            ? String(data[item.id])
            : data[item.id].join()
      };
    });
  },
  data() {
    return {
      valid: true,
      mappedCards: []
    };
  }
};
</script>
<style scoped>
#containerHistoryEveningEntry {
  padding-bottom: 50px;
}
</style>