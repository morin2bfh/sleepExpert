<template>
  <v-card class="mx-auto mt-2" max-width="400" dark>
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

    <!-- Insert a checkbox if the option of the card(card.option) says 'checkbox' -->
    <div v-else-if="option == 'checkboxOption'">
      <v-container fluid>
        <v-checkbox @click="onCheckboxClicked(0)" :id="id" :label="'Vor dem zu Bett gehen'"></v-checkbox>
        <v-checkbox @click="onCheckboxClicked(1)" :id="id" :label="'In der Nacht'"></v-checkbox>
      </v-container>
    </div>

    <!-- Insert a number textfield if the option of the card(card.option) says 'numbers' -->
    <div v-else-if="option == 'numbersOption'">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="numbers"
          :label="label"
          :rules="ruleNumbers"
          :id="id"
          single-line
          type="number"
          @change="onNumberChanged()"
        />
      </v-col>
    </div>

    <!-- Insert a time textfield if the option of the card(card.option) says 'hhmm'.
    These are the inputs for a format like hh:mm-->
    <div v-else-if="option == 'hhmmOption'">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="hhmmValue"
          :label="label"
          :rules="ruleHMM"
          :id="id"
          single-line
          width="290px"
          @change="onTimeChanged()"
        />
      </v-col>
    </div>

<!-- Insert a clock if the option of the card(card.option) says 'clock' -->
    <div v-else-if="option == 'clockOption'">
      <v-col cols="12" sm="4">
        <v-dialog 
          ref="dialog" 
          v-model="clockTime" 
          :return-value.sync="time" 
          persistent 
          width="290px">
          
          <template v-slot:activator="{ on }">
            <v-text-field 
              v-model="time" 
              :label="label" 
              :rules="ruleClockTime"
              prepend-inner-icon="$vuetify.icons.clock"
              readonly 
              v-on="on">
            </v-text-field>
          </template>
          <v-time-picker
            v-if="clockTime"
            :id="id"
            v-model="time"
            full-width
            format="24hr"
            color="yellow darken-3"
            @change="onClockChanged()"
          >
            <v-spacer></v-spacer>
            <v-btn text color="yellow darken-3" @click="clockTime = false">Abbrechen</v-btn>
            <v-btn text color="yellow darken-3" @click="save(time)">Übernehmen</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "cardEntryMorning",
  props: {
    title: String,
    option: String,
    label: String,
    id: String
  },
  data() {
    return {
      numbersLabel: ["1", "2", "3", "4", "5", "6", "7", "8"],
      hhmmValue: null,
      medication: [false, false],
      numbers: null,
      test: null,
      time: null,
      clockTime: false,
      clock: false,

      ruleHMM: [
         v => !!v || "Zeit ist ein Pflichtfeld",
        v => (v || "").length <= 5 || "Maximal 4 Zeichen",
        v => {
          const pattern = /[0-9?]:[0-5?][0-9?]/;
          return pattern.test(v) || "Ungültiges Format, Bsp: 1:12";
        }
      ],
      ruleClockTime: [
         v => !!v || "Uhrzeit ist ein Pflichtfeld",
      ],
      ruleNumbers: [
        v => (v || "").length <= 1 || "Maximal 1 Zahl",
        v => {
          const pattern = /[0-9?]/;
          return pattern.test(v) || "Unwahrscheinliche Angabe, Max.: 9";
        }
      ]
    };
  },
  methods: {
    save(time) {
      this.$refs.dialog.save(time);
    },
    onCheckboxClicked(number) {
      this.medication[number] = !this.medication[number];

      const changedValue = {
        value: this.medication,
        id: this.id
      };
      this.$emit('changedValue', changedValue);
    },
    onNumberChanged() {
      const changedValue = {
        value: this.numbers * 1,
        id: this.id
      };
      this.$emit('changedValue', changedValue);
    },
    onTimeChanged() {
      const changedTime = {
        value: this.hhmmValue,
        id: this.id
      };
      this.$emit('changedTime', changedTime);
    },
    onClockChanged() {
      const changedClock = {
        value: this.time,
        id: this.id
      };
      this.$emit('changedClock', changedClock);
    }
  },
};
</script>