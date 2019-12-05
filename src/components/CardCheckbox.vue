<template>
    <v-checkbox
        :id="id"
        :label="label"
        :value="checkboxValue"
        @click="onCheckboxClicked(number)"
    >
    </v-checkbox>
</template>

<script>
export default {
  props: {
    value: Boolean,
    label: String,
    id: String,
    number: Number
  },
  data() {
      return {
        checkboxValue: false
      }
  },
  created() {
      this.checkboxValue = this.value;
  },
  methods: {
    onCheckboxClicked(number) {
        this.checkboxValue = !this.checkboxValue;
        let changedValue = {
            value: this.checkboxValue,
            id: this.id,
            number: number
        }

        this.$emit("changedValue", changedValue);
    }
  }
}
</script>