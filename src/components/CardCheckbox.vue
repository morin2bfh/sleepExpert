<template>
  <v-container fluid>
    <v-checkbox
      :id="id"
      :label="label"
      :disabled="disabled"
      v-model="checkboxValue"
      @click="onCheckboxClicked(number)"
    ></v-checkbox>
  </v-container>
</template>

<script>
export default {
  props: {
    value: Boolean,
    label: String,
    id: String,
    number: Number,
    disabled: Boolean
  },
  data() {
    return {
      checkboxValue: false
    };
  },
  created() {
    this.checkboxValue = this.value;
  },
  methods: {
    onCheckboxClicked(number) {
      let changedValue = {
        value: this.checkboxValue,
        id: this.id,
        number: number
      };

      this.$emit("changedValue", changedValue);
    }
  }
};
</script>