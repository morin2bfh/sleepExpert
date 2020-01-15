<!--
In diesem File wird die Komponente für den das Formular-Feld Slider definiert.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
  <v-slider
    v-model="numbers"
    :tick-labels="numbersLabel"
    :min="1"
    :max="numbersLabel.length"
    :color="'#F9A825'"
    :label="label"
    :id="id"
    :disabled="disabled"
    step="1"
    ticks="always"
    tick-size="4"
    @change="onSliderChanged()"
  ></v-slider>
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
      // Variabel, um den Wert des Sliders zu speichern
      numbers: null,
      numbersLabel: ["1", "2", "3", "4", "5", "6", "7", "8"]
    };
  },
  created() {
    // wurde eine value mitgegeben, so wird der Slider auf diese Zahl verschoben
    // dies wird für den Verlauf gebraucht
    this.numbers = this.value * 1;
  },
  methods: {
    // ändert sich der Slider, so wird die Änderung an die Ober-Komponente weitergegeben
    onSliderChanged() {
      const changedNumber = {
        value: this.numbers * 1,
        id: this.id
      };
      this.$emit("changedNumber", changedNumber);
    }
  }
};
</script>