<template>
  <v-card class="mx-auto mt-2" max-width="400" dark>
    <v-card-title>{{title}}</v-card-title>
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
      ></v-slider>
    </div>

    <!-- Insert a slider if the option of the card(card.option) says 'checkbox Genuss' -->
    <div v-else-if="option == 'checkboxOptionGenuss'">
      <v-container fluid>
        <v-checkbox @click="setCBValue(option, 0)" :label="'Kaffe'"></v-checkbox>
        <v-checkbox @click="setCBValue(option, 1)" :label="'Tee'"></v-checkbox>
        <v-checkbox @click="setCBValue(option, 2)" :label="'Cola'"></v-checkbox>
        <v-checkbox @click="setCBValue(option, 3)" :label="'Alkohol'"></v-checkbox>
      </v-container>
    </div>

    <!-- Insert a slider if the option of the card(card.option) says 'checkbox Schlaf' -->
    <div v-else-if="option == 'checkboxOptionSchlaf'">
      <v-container fluid>
        <v-checkbox @click="setCBValue(option, 0)" :label="'Mittagsschlaf'"></v-checkbox>
        <v-checkbox @click="setCBValue(option, 1)" :label="'Nickerchen vor dem TV'"></v-checkbox>
        <v-checkbox @click="setCBValue(option, 2)" :label="'Power-Nap'"></v-checkbox>
      </v-container>
    </div>

    <!-- Insert a slider if the option of the card(card.option) says 'buttons' -->
    <div v-else-if="option == 'buttonsOption'">
      <v-container horizontal align="alignment">
        <v-layout row child-flex justify-center align-center wrap>
          <v-spacer></v-spacer>
          <v-btn color="#6D4C41" @click="cancel()">Abbrechen</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#FBC02D" @click="submit()">Speichern</v-btn>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "cardEntry",
  props: {
    title: String,
    option: String,
    label: String,
    id: String
  },
  data() {
    return {
      alignment: "center",
      numbers: null,
      numbersLabel: ["1", "2", "3", "4", "5", "6", "7", "8"],
      substances: [false, false, false, false],
      daysleep: [false, false, false]
    };
  },
  methods: {
    submit() {
      // Hier Daten in DB speichern
      this.$router.push("/dashboard");
    },
    cancel() {
      this.$router.push("/dashboard");
    },
    setCBValue(option, index) {
      if (option == "checkboxOptionGenuss") {
        this.substances[index] = !this.substances[index];
      } else if (option == "checkboxOptionSchlaf") {
        this.daysleep[index] = !this.daysleep[index];
      }
    }
  }
};
</script>
