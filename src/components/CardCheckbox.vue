<template>
  <v-container fluid>
    <v-checkbox
      :id="id"
      :label="label"
      :disabled="disabled"
      :value="checkboxValue"
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
      console.log(this.checkboxValue);
      this.checkboxValue = !this.checkboxValue;
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