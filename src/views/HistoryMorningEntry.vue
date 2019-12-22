<template>
  <v-container id="containerMorningEntry">
    <card-entry-morning
      dark
      v-for="card in mappedCards"
      :key="card.title"
      :title="card.title"
      :option="card.option"
      :label="card.label"
      :id="card.id"
      :value="card.value"
      :disabled="true"
    ></card-entry-morning>
  </v-container>
</template>
<script>
import CardEntryMorning from "@/components/CardEntryMorning.vue";
import entryItems from "@/config/morningEntryConfig.js";
export default {
  components: {
    CardEntryMorning
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
      mappedCards: []
    };
  }
};
</script>
<style scoped>
</style>