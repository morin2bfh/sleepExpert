<template>
  <v-card class="mx-auto mt-2" dark>
    <v-card-title>{{ title }}</v-card-title>

    <!-- Insert a slider if the option of the card(card.option) says 'slider' -->
    <div v-if="option == 'sliderOption'">
      <v-slider
        v-model="numbers"
        :tick-labels="numbersLabel"
        :min="1"
        :max="numbersLabel.length"
        :color="'#F9A825'"
        :label="label"
        :id="id"
        step="1"
        ticks="always"
        tick-size="4"
        @change="onNumberChanged()"
      ></v-slider>
    </div>

    <!-- Insert a slider if the option of the card(card.option) says 'checkbox Genuss' -->
    <div v-else-if="option == 'checkboxOptionGenuss'">
      <v-container fluid>
        <v-checkbox @click="onCheckboxClicked(option, 0)" :id="id" :label="'Kaffe'"></v-checkbox>
        <v-checkbox @click="onCheckboxClicked(option, 1)" :id="id" :label="'Tee'"></v-checkbox>
        <v-checkbox @click="onCheckboxClicked(option, 2)" :id="id" :label="'Cola'"></v-checkbox>
        <v-checkbox @click="onCheckboxClicked(option, 3)" :id="id" :label="'Alkohol'"></v-checkbox>
      </v-container>
    </div>

    <!-- Insert a slider if the option of the card(card.option) says 'checkbox Schlaf' -->
    <div v-else-if="option == 'checkboxOptionSchlaf'">
      <v-container fluid>
        <v-checkbox @click="onCheckboxClicked(option, 0)" :id="id" :label="'Mittagsschlaf'"></v-checkbox>
        <v-checkbox @click="onCheckboxClicked(option, 1)" :id="id" :label="'Nickerchen vor dem TV'"></v-checkbox>
        <v-checkbox @click="onCheckboxClicked(option, 2)" :id="id" :label="'Power-Nap'"></v-checkbox>
      </v-container>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "cardEntryEvening",
  props: {
    title: String,
    option: String,
    label: String,
    id: String
  },
  data() {
    return {
      numbers: null,
      numbersLabel: ["1", "2", "3", "4", "5", "6", "7", "8"],
      stimulats: [false, false, false, false],
      daySleep: [false, false, false]
    };
  },
  methods: {
    onCheckboxClicked(option, index) {
      let changedValue = {};
      if (option == "checkboxOptionGenuss") {
        this.stimulats[index] = !this.stimulats[index];
        changedValue = {
          value: this.stimulats,
          id: this.id
        };
      } else if (option == "checkboxOptionSchlaf") {
        this.daySleep[index] = !this.daySleep[index];
        changedValue = {
          value: this.daySleep,
          id: this.id
        };
      }
      
      this.$emit("changedValue", changedValue);
    },
    onNumberChanged() {
      const changedValue = {
        value: this.numbers * 1,
        id: this.id
      };
      this.$emit("changedValue", changedValue);
    },
  }
};
</script>