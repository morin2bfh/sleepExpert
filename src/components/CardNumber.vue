<!--
In diesem File wird die Komponente für den das Formular-Feld Nummern-Textfeld definiert.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
  <v-col cols="12" sm="4">
    <v-text-field
      v-model="numbers"
      :label="label"
      :rules="ruleNumbers"
      :id="id"
      :disabled="disabled"
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
    id: String,
    disabled: Boolean
  },
  data() {
    return {
      // Variabel, um den Wert des Nummern-Textfelds zu speichern
      numbers: null,
      // Regel, dass die Nummer im Textfeld unter 30 sein muss
      ruleNumbers: [
        v => {
          if (v === null || v < 30) {
            return true;
          }
          return "Unwahrscheinliche Angabe, maximal 29";
        }
      ]
    };
  },
  created() {
    // wurde eine value mitgegeben, so wird der Wert in das Nummern-Textfeld geschrieben
    // dies wird für den Verlauf gebraucht
    if (this.value) {
      this.numbers = this.value * 1;
    }
  },
  methods: {
    // ändert sich der Wert im Textfeld, so wird die Änderung an die Ober-Komponente weitergegeben
    onNumberChanged() {
      const changedNumber = {
        value: this.numbers * 1,
        id: this.id
      };
      this.$emit("changedNumber", changedNumber);
    }
  }
};
</script>