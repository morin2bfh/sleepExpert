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
        step="1"
        ticks="always"
        tick-size="4"
      ></v-slider>
    </div>

    <!-- Insert a slider if the option of the card(card.option) says 'checkbox Genuss' -->
    <div v-else-if="option == 'checkboxOptionGenuss'">
      <v-container fluid>
        <v-checkbox v-model="checkbox1" :label="'Kaffe'"></v-checkbox>
        <v-checkbox v-model="checkbox2" :label="'Tee'"></v-checkbox>
        <v-checkbox v-model="checkbox3" :label="'Cola'"></v-checkbox>
      <v-checkbox v-model="checkbox4" :label="'Alkohol'"></v-checkbox>
        </v-container>
        </div>
 <!-- Insert a slider if the option of the card(card.option) says 'checkbox Schlaf' -->
<div v-else-if="option == 'checkboxOptionSchlaf'">
      <v-container fluid>
        <v-checkbox v-model="checkbox1" :label="'Mittagsschlaf'"></v-checkbox>
        <v-checkbox v-model="checkbox2" :label="'Nickerchen vor de TV'"></v-checkbox>
        <v-checkbox v-model="checkbox3" :label="'Power-ap'"></v-checkbox>
        </v-container>
        </div>

    <!-- Insert a slider if the option of the card(card.option) says 'buttons' -->
    <div v-else-if="option == 'buttonsOption'">
      <v-container horizontal>
        <v-btn color="#6D4C41">Abbrechen</v-btn>
        <v-btn color="#FBC02D" >Speichern</v-btn>
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
    label: String
  },
  data() {
    return {
      numbers: null,
      numbersLabel: ["1", "2", "3", "4", "5", "6", "7", "8"],
    checkbox1: null,
     checkbox2: null,
      checkbox3: null,
       checkbox4: null,

        }
      
      
},
};

</script>
