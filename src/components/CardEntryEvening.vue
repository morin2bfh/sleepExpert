<!--
In diesem File wird die Komponente für den Abendeintrag definiert. Je nach Option der Formular-
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
        @changedNumber="onChangedSlider($event)"
      ></card-slider>
    </div>

    <!-- Füge eine Checkbox für den Genuss ein, wenn die Option card(card.option) 'checkbox Genuss' ist -->
    <div v-else-if="option == 'checkboxOptionGenuss'">
      <v-container fluid>
        <card-checkbox
          v-for="checkbox in stimulantCheckbox"
          :label="checkbox.label"
          :key="checkbox.label"
          :id="id"
          :value="checkbox.value"
          :number="checkbox.number"
          :disabled="disabled"
          @changedValue="onChangedCheckbox($event)"
        ></card-checkbox>
      </v-container>
    </div>

    <!-- Füge eine Checkbox für den Schlaf ein, wenn die Option card(card.option) 'checkbox Schlaf' ist -->
    <div v-else-if="option == 'checkboxOptionSchlaf'">
      <v-container fluid>
        <card-checkbox
          v-for="checkbox in daySleepCheckbox"
          :label="checkbox.label"
          :key="checkbox.label"
          :id="id"
          :value="checkbox.value"
          :number="checkbox.number"
          :disabled="disabled"
          @changedValue="onChangedCheckbox($event)"
        ></card-checkbox>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import CardSlider from "./CardSlider.vue";
import CardCheckbox from "./CardCheckbox.vue";

export default {
  components: {
    CardSlider,
    CardCheckbox
  },
  name: "cardEntryEvening",
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
      // die Daten für die Checkbox "Genussmittel"
      stimulants: [
        {
          label: "Kaffee",
          value: false,
          number: 0
        },
        {
          label: "Tee",
          value: false,
          number: 1
        },
        {
          label: "Cola",
          value: false,
          number: 2
        },
        {
          label: "Alkohol",
          value: false,
          number: 3
        }
      ],
      // die Daten für die Checkbox "Tagesschlaf"
      daySleep: [
        {
          label: "Mittagsschlaf",
          value: false,
          number: 0
        },
        {
          label: "Nickerchen vor dem TV",
          value: false,
          number: 1
        },
        {
          label: "Power-Nap",
          value: false,
          number: 2
        }
      ]
    };
  },
  computed: {
    // die Daten, wie die Checkbox ausgefüllt ist, werden in das benötigte Format gebracht
    // dies wird für den Verlauf verwendet
    stimulantCheckbox: function() {
      let values = this.value.replace(/ /g, "");
      values = values.split(",");
      let stimulants = this.stimulants;
      for (let i = 0; i < values.length; i++) {
        let boolValue = values[i] == "true";
        stimulants[i].value = boolValue;
      }
      return stimulants;
    },
    // die Daten, wie die Checkbox ausgefüllt ist, werden in das benötigte Format gebracht
    // dies wird für den Verlauf verwendet
    daySleepCheckbox: function() {
      let values = this.value.replace(/ /g, "");
      //values = values.slice(1, -1).split(",");
      values = values.split(",");
      let daySleep = this.daySleep;
      for (let i = 0; i < values.length; i++) {
        let boolValue = values[i] == "true";
        daySleep[i].value = boolValue;
      }
      return daySleep;
    }
  },
  methods: {
    // wurde ein Slider geändert, wird der neue Wert an den Abendeintrag weitergegeben
    onChangedSlider(changedValue) {
      this.$emit("changedValue", changedValue);
    },
    // wurde eine Checkbox geändert, wird der neue Wert an den Abendeintrag weitergegeben
    // dazu wird das Array der Checkbox zuerst ins benötigte Format gebracht
    onChangedCheckbox(value) {
      let checkbox = null;
      if (value.id == "stimulants") {
        checkbox = this.stimulants;
      } else if (value.id == "daySleep") {
        checkbox = this.daySleep;
      }
      checkbox[value.number].value = value.value;
      let output = [];
      for (let i = 0; i < checkbox.length; i++) {
        output[i] = checkbox[i].value;
      }
      const changedValue = {
        value: output,
        id: value.id
      };
      this.$emit("changedValue", changedValue);
    }
  }
};
</script>