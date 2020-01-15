<!--
In diesem File wird die Komponente für den das Formular-Feld Checkbox definiert.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
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
      // Variabel, um den Wert der Checkbox zu speichern
      checkboxValue: false
    };
  },
  created() {
    // wurde eine value mitgegeben, so wird die Checkbox angepasst
    // dies wird für den Verlauf gebraucht
    this.checkboxValue = this.value;
  },
  methods: {
    // ändert sich die Checkbox, so wird die Änderung an die Ober-Komponente weitergegeben
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