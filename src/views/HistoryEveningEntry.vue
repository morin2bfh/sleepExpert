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

    this.mappedCards = entryItems.map(item => {
      return {
        ...item,
        value:
          item.option != "checkboxOption"
            ? String(data[item.id])
            : "[" + data[item.id].join() + "]"
      };
    });
  },
  data() {
    return {
      valid: true,
      mappedCards: [],
      eveningEntry: {
        dayTiredness: null,
        concentration: null,
        mood: null,
        relaxation: null,
        daySleep: [false, false, false],
        stimulants: [false, false, false, false],
        timestamp: new Date(),
        uid: null
      }
    };
  }
};
</script>
<style scoped>
#containerHistoryEveningEntry {
  padding-bottom: 50px;
}
</style>