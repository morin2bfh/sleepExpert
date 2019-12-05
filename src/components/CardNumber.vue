<template>
    <v-col cols="12" sm="4">
        <v-text-field
          v-model="numbers"
          :label="label"
          :rules="ruleNumbers"
          :id="id"
          single-line
          type="number"
          @change="onNumberChanged()"
        />
    </v-col>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    id: String
  },
  data() {
      return {
        numbers: null,
        ruleNumbers: [
        v => {
          if (v === null || v < 30) {
            return true;
          }
          return "Unwahrscheinliche Angabe, maximal 29";
        }
      ]
    }
  },
  created() {
      if(this.value) {
        this.numbers = this.value * 1;
      }
  },
  methods: {
    onNumberChanged() {
      const changedNumber = {
        value: this.numbers * 1,
        id: this.id
      };
      this.$emit("changedNumber", changedNumber);
    }
  }
}
</script>