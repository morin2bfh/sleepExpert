<!--
In diesem File wird die Komponente für den Morgeneintrag definiert. Je nach Option der Formular-
Felder, werden unterschiedliche Unter-Komponenten ausgeführt.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
  <v-card class="mx-auto mt-2" dark>
    <v-card-title>{{ title }}</v-card-title>

    <!-- Füge einen Slider ein, wenn die Option card(card.option) 'slider' ist -->
    <div v-if="option == 'sliderOption'">
      <card-slider
        :value="value"
        :label="label"
        :id="id"
        :disabled="disabled"
        @changedNumber="onChangedNumber($event)"
      ></card-slider>
    </div>

    <!-- Füge eine Checkbox ein, wenn die Option card(card.option) 'checkbox' ist -->
    <div v-else-if="option == 'checkboxOption'">
      <card-checkbox
        v-for="checkbox in medicationCheckbox"
        :label="checkbox.label"
        :key="checkbox.label"
        :id="id"
        :value="checkbox.value"
        :number="checkbox.number"
        :disabled="disabled"
        @changedValue="onChangedCheckbox($event)"
      ></card-checkbox>
    </div>

    <!-- Füge ein Textfeld für Zahlen ein, wenn die Option card(card.option) numbers' ist -->
    <div v-else-if="option == 'numbersOption'">
      <card-number
        :value="value"
        :label="label"
        :id="id"
        :disabled="disabled"
        @changedNumber="onChangedNumber($event)"
      ></card-number>
    </div>

    <!-- Füge ein Zeit-Textfeld ein, wenn die Option card(card.option) 'hhmm' ist
      Das sind Eingaben im Format hh:mm-->
    <div v-else-if="option == 'hhmmOption'">
      <card-time
        :value="value"
        :label="label"
        :id="id"
        :disabled="disabled"
        @changedTime="onChangedTime($event)"
      ></card-time>
    </div>

    <!-- Füge ein Uhr ein, wenn die Option card(card.option) 'clock' ist -->
    <div v-else-if="option == 'clockOption'">
      <card-clock
        :value="value"
        :label="label"
        :id="id"
        :disabled="disabled"
        @changedClock="onChangedNumber($event)"
      ></card-clock>
    </div>
  </v-card>
</template>

<script>
import CardSlider from "./CardSlider.vue";
import CardCheckbox from "./CardCheckbox.vue";
import CardNumber from "./CardNumber.vue";
import CardTime from "./CardTime.vue";
import CardClock from "./CardClock.vue";

export default {
  components: {
    CardSlider,
    CardCheckbox,
    CardNumber,
    CardTime,
    CardClock
  },
  name: "cardEntryMorning",
  props: {
    title: String,
    option: String,
    label: String,
    id: String,
    value: String,
    disabled: Boolean
  },
  data() {
    return {
      // die Daten für die Checkbox "Schlafmittel"
      medication: [
        {
          label: "Vor dem zu Bett gehen",
          value: false,
          number: 0
        },
        {
          label: "In der Nacht",
          value: false,
          number: 1
        }
      ]
    };
  },
  computed: {
    // die Daten, wie die Checkbox ausgefüllt ist, werden in das benötigte Format gebracht
    // dies wird für den Verlauf verwendet
    medicationCheckbox: function() {
      let values = this.value.replace(/ /g, "");
      values = values.split(",");
      let medication = this.medication;
      for (let i = 0; i < values.length; i++) {
        let boolValue = values[i] == "true";
        medication[i].value = boolValue;
      }
      return medication;
    }
  },
  methods: {
    // wurde ein Slider, ein Nummern-Textfeld oder eine Uhr geändert,
    // wird der neue Wert an den Morgeneintrag weitergegeben
    onChangedNumber(changedNumber) {
      this.$emit("changedValue", changedNumber);
    },
    // wurde eine Checkbox geändert, wird der neue Wert an den Morgeneintrag weitergegeben
    // dazu wird das Array der Checkbox zuerst ins benötigte Format gebracht
    onChangedCheckbox(value) {
      this.medication[value.number].value = value.value;
      let output = [];
      for (let i = 0; i < this.medication.length; i++) {
        output[i] = this.medication[i].value;
      }
      const changedValue = {
        value: output,
        id: value.id
      };
      this.$emit("changedValue", changedValue);
    },
    // wurde ein Zeit-Textfeld geändert, wird der neue Wert an den Morgeneintrag weitergegeben
    // dazu wird zuerst die Zeit in Minuten ausgerechnet
    onChangedTime(changedTime) {
      let value = changedTime.value;
      let minutes = value.split(":")[0] * 60 + value.split(":")[1] * 1;

      const changedValue = {
        value: minutes,
        id: changedTime.id
      };
      this.$emit("changedValue", changedValue);
    }
  }
};
</script>